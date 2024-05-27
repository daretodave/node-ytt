# ytt

thin abstraction over the [ytt cli](https://github.com/carvel-dev/ytt) for install with npm, cross platform

# install

```bash
npm i -g node-ytt-cli
```

# usage

> refer to ytt documentation on [cli](https://github.com/carvel-dev/ytt)

### as pkg
```javascript
const {ytt} = require("node-ytt-cli");

console.log(ytt.exec("--help"));
```

### as cli
```bash
ytt --help
```

