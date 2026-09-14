import LightboxCore from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import PlaceholderImage from './PlaceholderImage'

/**
 * Thin wrapper around yet-another-react-lightbox with a custom slide
 * renderer so entries with no real photo yet still show a graceful
 * placeholder instead of a broken image.
 */
export default function Lightbox({ index, onClose, slides }) {
  return (
    <LightboxCore
      open={index !== null}
      close={onClose}
      index={index ?? 0}
      slides={slides}
      plugins={[Captions]}
      captions={{ descriptionTextAlign: 'center' }}
      render={{
        slide: ({ slide }) => (
          <div className="flex h-full w-full items-center justify-center p-4">
            {slide.src ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-h-full max-w-full rounded object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <PlaceholderImage
                label={slide.title || 'Photo placeholder'}
                className="h-[50vh] max-h-[70vh] w-[50vh] max-w-[85vw] rounded-lg"
              />
            )}
          </div>
        ),
      }}
    />
  )
}
