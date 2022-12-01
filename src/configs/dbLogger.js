const Transport = require('winston-transport');

module.exports = class WinstonDB extends Transport {
  constructor(opts) {
    super(opts);
    this.model = opts.model;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    this.model.create(
      {
        eventAt: Date.now(),
        eventLevel: info.level,
        eventLog: info.message,
      },
      { logging: false }
    );

    callback();
  }
};
