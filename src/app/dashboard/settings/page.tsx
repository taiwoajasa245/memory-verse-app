"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Heart, Cross, Smile, Sun, Activity } from "lucide-react";
import TagInput from "@/components/ui/tag-input";
import { getUserDetails, updateUserProfile } from "@/lib/api/auth";


export default function SettingsPage() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("user@memoryverse.app");

  const [versePace, setVersePace] = useState("daily");
  const [bibleTranslation, setBibleTranslation] = useState("NIV");

  
  const [isEmailNotification, setIsEmailNotification] = useState(true);
  const [isWebNotification, setIsWebNotification] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  // const [timezone, setTimezone] = useState("(GMT+01:00) British Summer Time");

  const [inspirations, setInspirations] = useState<string[]>([]);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const initialRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const user = await getUserDetails();
        if (!mounted) return;
        
        setName(user.user_name || "");
        setEmail(user.email || "");
      
        // @ts-ignore
        setVersePace(user.verse_pace || versePace);
        // @ts-ignore
        setBibleTranslation(user.bible_translation || bibleTranslation);
        // @ts-ignore
        setIsEmailNotification(Boolean(user.is_email_notification ?? isEmailNotification));
        // @ts-ignore
        setIsWebNotification(Boolean(user.is_web_notification ?? isWebNotification));
        // @ts-ignore
        setSelectedTime(user.selected_time ? String(user.selected_time).slice(11,16) : selectedTime);
        // prefer `inspirations` key but handle legacy `inspiration`
        // @ts-ignore
        const apiInspirations: string[] = user.inspirations || user.inspiration || [];
        setInspirations(apiInspirations.length ? apiInspirations : ["Faith"]);
        
        // store initial snapshot for cancel
        initialRef.current = {
          name: user.user_name || "",
          email: user.email || "",
          versePace: user.verse_pace || versePace,
          bibleTranslation: user.bible_translation || bibleTranslation,
          isEmailNotification: Boolean(user.is_email_notifications ?? isEmailNotification),
          isWebNotification: Boolean(user.is_web_notifications ?? isWebNotification),
          selectedTime: user.selected_time ? String(user.selected_time).slice(11,16) : selectedTime,
          inspirations: apiInspirations.length ? apiInspirations : inspirations,
        };
      } catch (e) {
        console.error("Failed to load user details", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="flex flex-1 justify-center py-6 px-3 sm:px-6 lg:px-10 bg-background-light dark:bg-background-dark text-[#333] dark:text-white font-display min-h-screen">
      <div className="max-w-3xl w-full space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Settings</h1>
        </div>

        <div className="dark:bg-background-dark/50 rounded-xl shadow-sm p-4 sm:p-8 space-y-8 border border-gray-200 dark:border-gray-700">
          {/* Account */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3">Account</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" className="my-4 w-full" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="my-4 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Verse Preferences */}
            <div>
              <h3 className="text-lg font-bold mb-3">Verse Preferences</h3>
              <div className="space-y-4">
                <div>
                  <Label className="my-4">Verse Pace</Label>
                  <Select value={versePace}  onValueChange={(v) => setVersePace(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pace" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="my-4">Bible Translation</Label>
                  <Select value={bibleTranslation} onValueChange={setBibleTranslation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select translation" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="NIV">NIV</SelectItem>
                      <SelectItem value="KJV">KJV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Inspirations & Notifications */}
          <section className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3">Inspirations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Pick topics you'd like to receive verses about.</p>
              <div>
                <TagInput
                  value={inspirations}
                  onChange={(next) => setInspirations(next)}
                  suggestions={["Love", "Faith", "Hope", "Peace", "Strength", "Wisdom", "Praise", "Forgiveness", "Encouragement"]}
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { name: "Love", icon: Heart },
                    { name: "Faith", icon: Cross },
                    { name: "Hope", icon: Smile },
                    { name: "Peace", icon: Sun },
                    { name: "Strength", icon: Activity },
                  ].map((topic) => {
                    const Icon = topic.icon as any;
                    const selected = inspirations.includes(topic.name);
                    return (
                      <button
                        key={topic.name}
                        type="button"
                        onClick={() => {
                          setInspirations((prev) => prev.includes(topic.name) ? prev.filter((p) => p !== topic.name) : [...prev, topic.name]);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border transition text-sm ${selected ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/10'}`}>
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{topic.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Notifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"><Mail className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium">Email Notification</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive verses in your inbox.</p>
                    </div>
                  </div>

                  <Switch className="border border-gray-300 dark:border-gray-700" checked={isEmailNotification} onCheckedChange={setIsEmailNotification} />
                </div>

                {/* <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white"><Bell className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium">Web Push Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive browser reminders.</p>
                    </div>
                  </div>
                  <Switch checked={isWebNotification} onCheckedChange={setIsWebNotification} />
                </div> */}
              </div>

              <div className="mt-6">
                <Label>Reminder Time</Label>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="flex-1 min-w-0 h-11 px-3 rounded-lg border bg-transparent" />
                  <div className="flex gap-2 flex-wrap">
                    <button type="button" onClick={() => setSelectedTime('08:00')} className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm">Morning</button>
                    <button type="button" onClick={() => setSelectedTime('12:00')} className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm">Noon</button>
                    <button type="button" onClick={() => setSelectedTime('20:00')} className="flex-shrink-0 px-3 py-2 rounded-lg bg-primary/10 text-sm">Evening</button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Choose when you'd like to receive reminders.</p>
              </div>
            </div>
          </section>

          <Separator />

            <div className="flex justify-end gap-3 pt-2 flex-wrap">
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => {
                // restore initial snapshot if available
                if (initialRef.current) {
                  const s = initialRef.current;
                  setName(s.name); setEmail(s.email); setVersePace(s.versePace); setBibleTranslation(s.bibleTranslation);
                  setIsEmailNotification(s.isEmailNotification); setIsWebNotification(s.isWebNotification);
                  setSelectedTime(s.selectedTime); setInspirations(s.inspirations || []);
                }
              }}>Reset</Button>

              <Button className="bg-primary text-[#333] hover:bg-primary/90 w-full sm:w-auto" onClick={async () => {
                setSaving(true); setSaveMessage(null);
                try {
                  await updateUserProfile(
                    name,
                    email,
                    versePace,
                    bibleTranslation,
                    Boolean(isEmailNotification),
                    inspirations.length ? inspirations : ["Faith"],
                    Boolean(isEmailNotification),
                    Boolean(isWebNotification),
                    selectedTime,
                  );
                  setSaveMessage('Settings saved successfully');
                  initialRef.current = { name, email, versePace, bibleTranslation, isEmailNotification, isWebNotification, selectedTime, inspirations };
                } catch (e: any) {
                  console.error(e);
                  setSaveMessage(e?.message || 'Failed to save settings');
                } finally {
                  setSaving(false);
                  setTimeout(() => setSaveMessage(null), 5000);
                }
              }} disabled={saving || loading}>
                {saving ? 'Saving...' : (loading ? 'Loading...' : 'Save Changes')}
              </Button>
            
          </div>
          {saveMessage && <p className="text-sm text-center mt-2">{saveMessage}</p>}
        </div>
      </div>
      </main>
  );
}