export const dailySecrets = [
  "Your hidden talent lies in understanding people's true emotions. In an alternate universe, you're a renowned psychic detective.",
  "The universe has marked you as someone who will inspire a major breakthrough in your field within the next 3 years.",
  "Your greatest fear is also your greatest strength - the ability to see potential failures before they happen gives you incredible foresight.",
  "In dreams, you've been visiting a place that will become significant in your real life. Pay attention to recurring locations.",
  "Your voice has a unique frequency that naturally calms anxious minds. You're meant to be a healer.",
  "There's an unfinished creative project from your past that holds the key to your future success. The universe is waiting for you to revisit it.",
  "Your intuition is actually a form of time-perception - you sense future outcomes before they manifest.",
  "You have an invisible magnetic field that draws like-minded souls. Your tribe is slowly gathering around you.",
  "The number that appears most in your life is your cosmic identifier - it will lead to your destiny.",
  "Your childhood imaginary friend was actually your future self guiding you through time.",
  "You're naturally drawn to certain colors because they match your soul's frequency from a past life.",
  "Your recurring dreams are memories from parallel dimensions where you made different choices.",
  "The universe sends you signs through music - pay attention to songs that randomly play when you need guidance.",
  "Your birthmark is actually a cosmic map showing where your soul originated in the galaxy.",
  "You have the rare ability to sense the emotional history of objects just by touching them.",
];

export function getRandomSecret(): string {
  return dailySecrets[Math.floor(Math.random() * dailySecrets.length)];
}
