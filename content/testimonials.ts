// Farmer testimonial shown on the home page and sustainability page.
// Quote text is from "AAAN Website Content (English).md", section 2.9. The copy marks it as example text
// pending the filmed interview (V08); AAAN has asked for it to be used at launch.

export type Testimonial = {
  quote: string;
  attribution: string;
  image: string;
  imageAlt: string;
};

export const testimonial: Testimonial = {
  quote:
    "Before AAAN, I sold to whoever came. Now I have clean seed, a trainer I can call, and a buyer I can count on.",
  attribution: "Farmer, Nyandarua, Kenya",
  image: "/media/young-adult-kenyan-farmer-standing-in-his-vegetabl.png",
  imageAlt: "A farmer standing in his vegetable field in Nyandarua",
};
