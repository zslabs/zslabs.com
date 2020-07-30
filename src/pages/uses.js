import { useTheme } from 'emotion-theming'
import {
  Section,
  SectionTitle,
  Inline,
  ListItem,
} from 'chaoskit/src/components'
import { fluidSize } from 'chaoskit/src/assets/styles/utility/misc'

import Foundation from '~layouts/Foundation'
import HelmetSEO from '~components/HelmetSEO'
import { titleStyles } from '~helpers'

const Box = (props) => {
  const theme = useTheme()

  return (
    <ListItem
      css={[
        fluidSize({
          theme,
          property: 'padding',
          from: theme.space.base,
          to: theme.space.large,
        }),
        {
          border: theme.border.base,
          borderRadius: theme.borderRadius.base,
        },
      ]}
      {...props}
    />
  )
}

const Uses = () => {
  const theme = useTheme()

  return (
    <Foundation>
      <HelmetSEO title="Uses" />
      <Section>
        <SectionTitle
          as="h1"
          title="Uses"
          sub="My everyday setup for all things tech"
          css={{
            '.CK__SectionTitle__Header': [
              titleStyles(theme),

              {
                '&::before': {
                  clipPath:
                    'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)',
                  backgroundPosition: '-200px -50px',
                },
              },
            ],
          }}
        />
        <Inline size="base">
          <Box>hello</Box>
          <Box>hello</Box>
          <Box>hello</Box>
          <Box>hello</Box>
          <Box>hello</Box>
        </Inline>
      </Section>
    </Foundation>
  )
}

export default Uses
