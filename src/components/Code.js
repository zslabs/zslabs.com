import * as React from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTheme } from '@emotion/react'
import { Button } from 'chaoskit/src/components'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'

import Icon from './Icon'

const CodeHeader = ({ filename, language, codeString, ...rest }) => {
  const theme = useTheme()

  const [isCopied, setCopied] = React.useState(false)

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
        display: 'grid',
        alignItems: 'center',
        gap: theme.space.base,
        gridTemplateColumns: filename ? '1fr auto auto' : '1fr auto',
        background: theme.color.dark.base,
        fontSize: theme.fontSize.small,
        paddingTop: theme.space.small,
        paddingBottom: theme.space.small,
        paddingLeft: theme.space.base,
        paddingRight: theme.space.base,
        borderTopLeftRadius: theme.borderRadius.base,
        borderTopRightRadius: theme.borderRadius.base,
        boxShadow: `inset 0 -1px 0 0 ${rgba(theme.color.light.base, 0.15)}`,

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
            type="reset"
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
        <div
          css={{
            boxShadow: theme.boxShadow.large,
            marginTop: theme.space.base,
            marginBottom: theme.space.base,
          }}
        >
          {(filename || language) && (
            <CodeHeader
              filename={filename}
              language={language}
              codeString={codeString}
            />
          )}
          <pre className={className}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <span
                  css={{
                    opacity: theme.opacity.base,
                    width: '2em',
                    userSelect: 'none',
                    display: 'inline-block',
                  }}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
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
