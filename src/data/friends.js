// Friend messages for the carousel. Add/remove entries freely — the carousel
// and pagination adapt automatically to however many are here.
// `image`: path under /public/images/friends/ (leave empty for a placeholder).
export const friends = Array.from({ length: 22 }, (_, i) => ({
  name: `[Friend Name ${i + 1}]`,
  image: '',
  relationship: '[Relationship, e.g. "Best friend since school"]',
  message:
    '[FRIEND MESSAGE — replace with their real birthday message for Krishika.]',
}))
