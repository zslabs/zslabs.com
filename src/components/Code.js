import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTheme } from 'emotion-theming'
import { Button } from 'chaoskit/src/components'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'

import Icon from './Icon'

const CodeHeader = ({ filename, language, codeString, ...rest }) => {
  const theme = useTheme()

  const [isCopied, setCopied] = useState(false)

  // Reset icon after 3 seconds
  useUpdateEffect(() => {
    if (isCopied) {
      setTimeout(() => setCopied(false), 3000)
    }
  }, [isCopied])

  return (
    <div
      className="u-contrast"
      css={{
        marginTop: theme.space.base,
        display: 'grid',
        alignItems: 'center',
        gap: theme.space.small,
        gridTemplateColumns: filename ? '1fr auto auto' : '1fr auto',
        background: theme.color.dark.base,
        fontSize: theme.fontSize.small,
        paddingTop: theme.space.xsmall,
        paddingBottom: theme.space.xsmall,
        paddingLeft: theme.space.base,
        paddingRight: theme.space.base,
        borderTopLeftRadius: theme.borderRadius.base,
        borderTopRightRadius: theme.borderRadius.base,

        '+ .prism-code': {
          marginTop: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      }}
      {...rest}
    >
      {filename && (
        <div
          css={{
            fontFamily: theme.fontFamily.code,
          }}
        >
          {filename}
        </div>
      )}
      {language && (
        <div
          css={{
            fontWeight: theme.fontWeight.bold,
            textTransform: 'uppercase',
            textAlign: 'right',
          }}
        >
          {language}
        </div>
      )}
      <div>
        <CopyToClipboard text={codeString} onCopy={() => setCopied(true)}>
          <Button
            css={{
              top: 'auto', // Reset default inline offset
            }}
            title="Copy"
            iconOnly
            size="xsmall"
          >
            {isCopied ? <Icon icon="check" /> : <Icon icon="copy" />}
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

CodeHeader.propTypes = {
  filename: PropTypes.string,
  language: PropTypes.string,
  codeString: PropTypes.string,
}

const Code = ({ codeString, language, filename }) => {
  const theme = useTheme()

  return (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={codeString}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {(filename || language) && (
            <CodeHeader
              filename={filename}
              language={language}
              codeString={codeString}
            />
          )}
          <pre
            className={className}
            css={{
              // Takes care of whitespace lines
              '.token-line:empty': {
                marginTop: theme.space.base,
              },
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {!line[0].empty &&
                  line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
              </div>
            ))}
          </pre>
        </Fragment>
      )}
    </Highlight>
  )
}

Code.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  filename: PropTypes.string,
}

export default Code
