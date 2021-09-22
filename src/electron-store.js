'use strict'

import path from 'path'
import { app as electronApp, shell } from 'electron'
import { app as remoteApp } from '@electron/remote'
import Conf from 'conf'

class ElectronStore extends Conf {
  constructor (options) {
    const app = (electronApp || remoteApp)
    const defaultCwd = app.getPath('userData')

    options = {
      name: 'config',
      ...options
    }

    if (!options.projectVersion) {
      options.projectVersion = app.getVersion()
    }

    if (options.cwd) {
      options.cwd = path.isAbsolute(options.cwd) ? options.cwd : path.join(defaultCwd, options.cwd)
    } else {
      options.cwd = defaultCwd
    }

    options.configName = options.name
    delete options.name
    super(options)
  }

  openInEditor () {
    shell.openPath(this.path)
  }
}

export default ElectronStore

