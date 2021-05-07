class OpenBrowserPlugin {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    compiler.hooks.done.tap('OpenBrowserPlugin', (
      stats /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      console.log(compiler);
    });
  }
}
module.exports = OpenBrowserPlugin;
