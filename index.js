/**
 * Prepend file name and number as part of the babel process
 *
 * @author Sergey Mild
 */

module.exports = (babel) => {
  const { types: t } = babel;

  return {
    visitor: {
      CallExpression(path, state) {

        const opts = state.opts;

        if (path.node.callee.object &&
          path.node.callee.object.name === 'console' &&
          path.node.callee.property.name !== 'table'
        ) {
          const isNodeModules = opts.skipNodeModules === true && state.file.opts.filename.includes('node_modules')
          if (isNodeModules) return;
          const args = path.node.arguments
          if (args.length === 0) return

          let file = state.file.opts.filename;
          const segments = file.split("/")
          file = segments[segments.length - 1]

          let ffff = `${file} (${path.node.loc.start.line})`
          console.log('[Index.CallExpression]', ffff)

          if(args[0].value !== ffff) args.unshift(t.stringLiteral(ffff));
        }

      },
    },
  };
};

