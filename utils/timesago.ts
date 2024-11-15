function timesago(time: any, options = {}) {
  const defaultOptions = {
    now: Date.now(),
    prefixFromNow: "in",
    suffixAgo: "ago",
    justNow: "just now",
    blank: "",
  };

  const config = { ...defaultOptions, ...options };

  const intervals = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    week: 60 * 60 * 24 * 7,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  };

  try {
    const timestamp = new Date(time).getTime();
    const difference = Math.abs(config.now - timestamp) / 1000;

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(difference / seconds);

      if (interval >= 1) {
        return (
          config[config.now < timestamp ? "prefixFromNow" : "blank"] +
          " " +
          interval +
          " " +
          unit +
          (interval === 1 ? "" : "s") +
          " " +
          config[config.now > timestamp ? "suffixAgo" : "blank"]
        ).trim();
      }
    }

    return config.justNow;
  } catch (error) {
    return "INVALID TIMESTAMP";
  }
}

export default timesago;
