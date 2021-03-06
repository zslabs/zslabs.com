import Foundation from '~layouts/Foundation'
import pattern from '~media/pattern.png'
import HelmetSEO from '~components/HelmetSEO'

const NotFoundPage = () => (
  <Foundation>
    <HelmetSEO title="404 Page Not Found" />
    <h1
      css={{
        WebkitBackgroundClip: 'text !important',
        WebkitTextFillColor: 'transparent !important',
        background: `url(${pattern}) no-repeat 50%`,
        backgroundSize: 'cover',
        fontSize: '25vw',
        textAlign: 'center',
        marginBottom: 0,
      }}
    >
      404
    </h1>
  </Foundation>
)

export default NotFoundPage
