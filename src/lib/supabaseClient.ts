import { createClient } from "@supabase/supabase-js";

const url = "https://wqycymingqnrthaacipj.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeWN5bWluZ3FucnRoYWFjaXBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MjU5OTAsImV4cCI6MjA4MzIwMTk5MH0.KZclrHBEJ6lsxAR7yU4ljbQuKf2P1M7GURz0f7RYseE";
console.log(url, anonKey);
export const supabase = createClient(url, anonKey);
