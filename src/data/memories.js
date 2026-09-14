// General memory gallery. `image` under /public/images/memories/.
// `category` is a free-form label used only for the caption/collage — e.g.
// 'Her', 'Friends', 'Family', 'Trips', 'Funny moments'.
export const memories = Array.from({ length: 12 }, (_, i) => ({
  image: '',
  caption: `[Caption for memory ${i + 1}]`,
  category: '[Category]',
}))
