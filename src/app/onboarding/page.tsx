"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Cross,
  Users,
  Smile,
  Sun,
  Star,
  Book,
  Activity,
  Leaf,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import TagInput from "@/components/ui/tag-input";
import clsx from "clsx";
import Link from "next/link";
import { useAuth, useIsProfileCompleted } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useEffect } from "react";
import { completeUserProfile, getUserDetails } from "@/lib/api/auth";
import { get } from "http";

const onboardingSteps = [
  "Set Your Pace",
  "Choose Your Inspiration",
  "Set Your Reminders",
  "All Set",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [frequency, setFrequency] = useState("daily");
  const [translation, setTranslation] = useState("NIV");
  const [notifications, setNotifications] = useState({
    email: false,
    webPush: false,
  });
  const [inspirations, setInspirations] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { user, isLoading, isAuthenticated } = useAuth();
  const { isProfileCompleted } = useIsProfileCompleted();
  const router = useRouter();
  const [error, setError] = useState("");

  const completeProfileMutation = useMutation({
    mutationFn: () =>
      completeUserProfile(
        userName,
        frequency,
        translation,
        notifications.email,
        inspirations,
        notifications.email,
        notifications.webPush,
        selectedTime,
      ),
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setError(error?.message || "Failed to complete profile");
    },
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getUserDetails();
        if (!mounted) return;
        // @ts-ignore - handle keys `inspirations` or `inspiration`
        const apiInspirations: string[] = u.inspirations || u.inspiration || [];
        setInspirations(apiInspirations.length ? apiInspirations : ["Faith"]);
        // @ts-ignore
        setUserName(u.user_name || userName);
        // @ts-ignore
        setSelectedTime(u.selected_time ? String(u.selected_time).slice(11,16) : selectedTime);
        // @ts-ignore
        setNotifications({ email: Boolean(u.is_email_notification ?? u.is_email_notifications ?? notifications.email), webPush: Boolean(u.is_web_notifications ?? notifications.webPush) });
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; 
  }

  if (isProfileCompleted) {
    return null; 
  }

  const validateStep = () => {
    setError("");
    if (step === 0) {
      if (!userName.trim()) {
        setError("Please enter a user name to continue.");
        return false;
      }
    }
    if (step === 1) {
      if (inspirations.length === 0) {
        setError("Please choose at least one inspiration to continue.");
        return false;
      }
    }
    if (step === 2) {
      if (!notifications.email && !notifications.webPush) {
        setError("Please select at least one reminder option to continue.");
        return false;
      }
      if (!selectedTime) {
        setError("Please choose a time for your reminders.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      if (!validateStep()) return;
      setError("");
      setStep(step + 1);
    }
  };

  const toggleInspiration = (name: string) => {
    setInspirations((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
    if (error) setError("");
  };



  return (
    <main className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark items-center justify-center py-10 px-4 sm:px-6 md:px-10 transition-all duration-300">
      {/* Header */}
      <div className="text-center max-w-lg sm:max-w-xl mb-8 px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Welcome to MemoryVerse
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Embark on a transformative journey of faith, one verse at a time.
          Let's get you started.
        </p>
      </div>

      {/* Card */}
      <div className="bg-transparent border dark:bg-card-background-dark rounded-xl shadow-lg w-full max-w-md sm:max-w-2xl md:max-w-3xl p-5 sm:p-8 flex flex-col gap-6 transition-all duration-300">
        {/* Step Indicator */}
        <div>
          <p className="text-sm text-end font-medium mb-2">
            Step {step + 1} of {onboardingSteps.length}
          </p>
          <div className="h-2 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${((step + 1) / onboardingSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Step 1 */}
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="user-name" className="mb-2 block" >
                User Name
              </Label>
              <Input
                id="user-name"
                placeholder="Enter your user name"
                value={userName}
                onChange={(e) => { setUserName(e.target.value); if (error) setError(""); }}
                className="h-12 w-full"
                required
              />
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-4">Set Your Pace</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["daily", "weekly"].map((freq) => (
                <label
                  key={freq}
                  className={clsx(
                    "flex flex-col p-4 border rounded-lg cursor-pointer items-start transition-all",
                    frequency === freq
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        "h-5 w-5 rounded-full border-2 flex-shrink-0 transition-colors",
                        frequency === freq
                          ? "border-primary bg-primary"
                          : "border-gray-300 dark:border-gray-500 bg-background-light dark:bg-background-dark"
                      )}
                    />
                    <div className="flex flex-col">
                      <p className="font-medium capitalize">{freq}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {freq === "daily"
                          ? "Receive a new verse every day"
                          : "Receive a new verse every week"}
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={frequency === freq}
                    onChange={() => setFrequency(freq)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>

            <h2 className="text-lg sm:text-xl font-bold mt-4">
              Preferred Translation
            </h2>
            <Select value={translation} onValueChange={setTranslation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Translation" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-background-dark">
                {["NIV", "KJV"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              Choose Your Inspiration
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
              Select the topics you'd like to receive verses about.
            </p>

            <div>
              <TagInput
                value={inspirations}
                onChange={(next) => setInspirations(next)}
                suggestions={["Love", "Faith", "Hope", "Peace", "Strength", "Wisdom", "Praise", "Forgiveness", "Encouragement"]}
                placeholder="Add inspirations (e.g. Gratitude)"
              />

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {["Love","Faith","Hope","Peace","Strength","Wisdom","Praise","Forgiveness","Encouragement"].map((t) => {
                  const selected = inspirations.includes(t);
                  return (
                    <button key={t} type="button" onClick={() => toggleInspiration(t)} className={clsx("p-3 rounded-lg border text-sm", selected ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/10')}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              Set Your Reminders
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
              Choose how you'd like MemoryVerse to remind you.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {["Email Notifications"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setNotifications((prev) => ({
                      ...prev,
                      [type === "Email Notifications" ? "email" : "webPush"]:
                        !prev[
                          type === "Email Notifications" ? "email" : "webPush"
                        ],
                    }));
                    if (error) setError("");
                  }}
                  className="flex justify-between items-center p-3 sm:p-4 rounded-lg border dark:bg-background-dark/50 backdrop-blur-sm cursor-pointer transition-all duration-300"
                >
                  <div>
                    <p className="font-medium text-sm sm:text-base">{type}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Receive reminders accordingly.
                    </p>
                  </div>
                  <Checkbox
                    checked={
                      notifications[
                        type === "Email Notifications" ? "email" : "webPush"
                      ]
                    }
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Label className="mb-2 block">Preferred Time</Label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => {
                    setSelectedTime(e.target.value);
                    if (error) setError("");
                  }}
                  className="flex-1 min-w-0 h-12 px-3 py-2 rounded-lg border bg-transparent"
                />
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => { setSelectedTime("08:00"); if (error) setError(""); }}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm"
                  >
                    Morning
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedTime("12:00"); if (error) setError(""); }}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm"
                  >
                    Noon
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedTime("20:00"); if (error) setError(""); }}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm"
                  >
                    Evening
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Choose a time for your daily reminders.</p>
            </div>
          </div>
        )}

      {step === 3 && (
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">You're All Set, {userName || "Friend"}!</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
              Here’s a quick summary of your MemoryVerse setup.
            </p>

            <div className="w-full max-w-md dark:bg-background-dark/50 border rounded-lg shadow-sm p-5 text-left">
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-lg">{userName || "Not provided"}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Pace</p>
                <p className="font-medium capitalize">{frequency}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Translation</p>
                <p className="font-medium">{translation}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Inspirations</p>
                {inspirations.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {inspirations.map((insp) => (
                      <span
                        key={insp}
                        className="px-3 py-1 text-xs sm:text-sm bg-primary/20 text-primary rounded-full"
                      >
                        {insp}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    No inspirations selected
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reminders</p>
                <ul className="mt-1 space-y-1">
                  {notifications.email && (
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Email Notifications
                    </li>
                  )}
                  {notifications.webPush && (
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Web Push Notifications
                    </li>
                  )}
                  {!notifications.email && !notifications.webPush && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      No reminders selected
                    </p>
                  )}
                  <li className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    At {selectedTime || "No time selected"}
                  </li>
                </ul>
              </div>
            </div>

            {/* <div>
              <Button
                onClick={() => {
                  setError("");
                  // validate before submitting
                  if (!validateStep()) return;
                  completeProfileMutation.mutate();
                  
                }}
                disabled={completeProfileMutation.isPending}
                className="flex items-center gap-2"
              >
                {completeProfileMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Continue
              </Button>
            </div> */}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mt-6 gap-3 w-full">
          <div className="w-full sm:w-1/3">
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          <div className="flex w-full sm:w-2/3 justify-between gap-3">
            <button
              className={clsx(
                "w-full sm:w-auto text-sm flex items-center justify-center gap-2 sm:text-base text-gray-600 dark:text-gray-400 hover:underline transition-all",
                step === 0 && "invisible"
              )}
              onClick={() => setStep(Math.max(0, step - 1))}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < onboardingSteps.length - 1 ? (
              (() => {
                const nextDisabled =
                  step === 0
                    ? !userName.trim()
                    : step === 1
                    ? inspirations.length === 0
                    : step === 2
                    ? (!notifications.email && !notifications.webPush) || !selectedTime
                    : false;

                return (
                  <Button
                    onClick={handleNext}
                    disabled={nextDisabled}
                    className={clsx(
                      "sm:w-auto flex items-center justify-center gap-2",
                      nextDisabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                );
              })()
            ) : (
              <Button onClick={() => { if (!validateStep()) return; completeProfileMutation.mutate(); }} className="sm:w-auto flex items-center justify-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
