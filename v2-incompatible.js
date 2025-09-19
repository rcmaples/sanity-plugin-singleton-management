import {showIncompatiblePluginDialog} from '@sanity/incompatible-plugin'

export default showIncompatiblePluginDialog({
  name: 'sanity-plugin-singleton-management',
  versions: {
    v3: '0.1.0',
    v2: undefined,
  },
})
