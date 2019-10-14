/**
 * Checks settings
 * @param exactPort : exact allowed port.
 * @param minPort : minimum allowed port range.
 * @param maxPort: maximum allowed port range.
 * @param checkProtocol: check if contains 'https://' or 'http://' at start of host string. Default is false
 */
export interface Settings {
    exactPort?: number;
    minPort?: number;
    maxPort?: number;
    checkProtocol?: boolean;
}

const numberHost = (): boolean => {
    // todo : https://github.com/jwerle/is-localhost
    /*
    ('127.0.0.1'); // true
    ('12.34.56.78'); // false
    ('::1'); // true
  */

    return true;
};

const stringHost = (host: string, settings: Settings): boolean => {
    if (!host.includes("localhost:")) {
        return false;
    }
    const split = host.split("localhost:");
    const port = Number(split[1]);
    if (port === 9050) {
        console.log("is 9050");
        return false;
    }
    // Not a valid protocoll
    if (settings.checkProtocol && split[0] !== "https://" && split[0] !== "http://") {
        return false;
    }

    // Match defined port
    if (settings.exactPort && port === settings.exactPort) {
        return true;
    }

    // Discard truethy values that may be parsed
    if (port === 1 || port === 0) {
        return false;
    }

    // Is not in allowed port range
    if (port < settings ? settings.minPort : 3000 || port > settings ? settings.maxPort : 9000) {
        return false;
    }

    return true;
};

/**
 * Checks if a string is a valid localhost. eg - http://localhost:3000
 * @param host : host to test
 * @param settings : check settings (min/max allowed port nubmer or exact port)
 */
export default function isLocalHost(
    host: string,
    settings: Settings = {
        minPort: 3000,
        maxPort: 9000,
        checkProtocol: false,
        exactPort: undefined,
    }
): boolean {
    return stringHost(host, settings) && numberHost();
}
