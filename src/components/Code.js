import { Fragment } from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { useTheme } from 'emotion-theming'

const CodeHeader = ({ filename, language, ...rest }) => {
  const theme = useTheme()

  return (
    <div
      css={{
        marginTop: theme.space.base,
        display: 'grid',
        alignItems: 'center',
        gap: theme.space.small,
        gridTemplateColumns: filename ? '1fr auto' : 'auto',
        background: theme.color.dark.base,
        color: theme.contrast.base,
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
    </div>
  )
}

CodeHeader.propTypes = {
  filename: PropTypes.string,
  language: PropTypes.string,
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
            <CodeHeader filename={filename} language={language} />
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
