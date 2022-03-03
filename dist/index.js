(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@elrondnetwork/erdjs"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["@elrondnetwork/erdjs", "vue"], factory);
	else if(typeof exports === 'object')
		exports["VueErd"] = factory(require("@elrondnetwork/erdjs"), require("vue"));
	else
		root["VueErd"] = factory(root["@elrondnetwork/erdjs"], root["Vue"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__8521__, __WEBPACK_EXTERNAL_MODULE__8976__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(5666);


/***/ }),

/***/ 3377:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncTimer = void 0;
const errors = __importStar(__webpack_require__(7902));
const errors_1 = __webpack_require__(7902);
const logger_1 = __webpack_require__(5553);
/*
 * AsyncTimer is an async-friendly abstraction that wraps JavaScript's setTimeout() and clearTimeout().
 */
class AsyncTimer {
    /**
     * Creates an AsyncTimer.
     */
    constructor(name) {
        this.timeoutHandle = null;
        this.rejectionFunc = null;
        this.name = name;
        this.correlationTag = 0;
    }
    /**
     * Starts the timer.
     * @param timeout The time (in milliseconds) to wait until resolving the promise.
     */
    start(timeout) {
        if (this.timeoutHandle) {
            throw new errors.ErrAsyncTimerAlreadyRunning();
        }
        this.correlationTag++;
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].start()`);
        return new Promise((resolve, reject) => {
            this.rejectionFunc = reject;
            let timeoutCallback = () => {
                this.rejectionFunc = null;
                this.stop();
                resolve();
            };
            this.timeoutHandle = setTimeout(timeoutCallback, timeout);
        });
    }
    /**
     * Aborts the timer: rejects the promise (if any) and stops the timer.
     */
    abort() {
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].abort()`);
        if (this.rejectionFunc) {
            this.rejectionFunc(new errors_1.ErrAsyncTimerAborted());
            this.rejectionFunc = null;
        }
        this.stop();
    }
    /**
     * Stops the timer.
     */
    stop() {
        if (this.isStopped()) {
            return;
        }
        logger_1.Logger.trace(`AsyncTimer[${this.name}'${this.correlationTag}].stop()`);
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
    }
    /**
     * Returns whether the timer is stopped.
     */
    isStopped() {
        return this.timeoutHandle ? false : true;
    }
}
exports.AsyncTimer = AsyncTimer;
//# sourceMappingURL=asyncTimer.js.map

/***/ }),

/***/ 7902:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrInvalidTxSignReturnValue = exports.ErrNotImplemented = exports.ErrInvalidEsdtTransferDataField = exports.ErrInvalidScCallDataField = exports.ErrBadPEM = exports.ErrContractInteraction = exports.ErrWrongMnemonic = exports.ErrWallet = exports.ErrCodec = exports.ErrStructTyping = exports.ErrTypingSystem = exports.ErrSerialization = exports.ErrTest = exports.ErrMock = exports.ErrContractQuery = exports.ErrContract = exports.ErrExpectedTransactionStatusNotReached = exports.ErrTransactionWatcherTimeout = exports.ErrAsyncTimerAborted = exports.ErrAsyncTimerAlreadyRunning = exports.ErrApiProviderPost = exports.ErrApiProviderGet = exports.ErrInvalidFunctionName = exports.ErrSignatureEmpty = exports.ErrSignatureCannotCreate = exports.ErrTransactionNotSigned = exports.ErrTransactionHashUnknown = exports.ErrGasPriceModifierInvalid = exports.ErrTransactionOptionsInvalid = exports.ErrTransactionVersionInvalid = exports.ErrChainIDInvalid = exports.ErrNonceInvalid = exports.ErrNotEnoughGas = exports.ErrGasLimitInvalid = exports.ErrGasPriceInvalid = exports.ErrBalanceInvalid = exports.ErrSignerCannotSign = exports.ErrAddressEmpty = exports.ErrAddressBadHrp = exports.ErrAddressCannotCreate = exports.ErrInvariantFailed = exports.ErrBadType = exports.ErrUnsupportedOperation = exports.ErrInvalidArgument = exports.Err = void 0;
class Err extends Error {
    constructor(message, inner) {
        super(message);
        this.inner = undefined;
        this.inner = inner;
    }
    /**
     * Returns a pretty, friendly summary for the error or for the chain of errros (if appropriate).
     */
    summary() {
        let result = [];
        result.push({ name: this.name, message: this.message });
        let inner = this.inner;
        while (inner) {
            result.push({ name: inner.name, message: inner.message });
            inner = inner.inner;
        }
        return result;
    }
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    html() {
        let summary = this.summary();
        let error = summary[0];
        let causedBy = summary.slice(1);
        let html = `
            An error of type <strong>${error.name}</strong> occurred: ${error.message}.
        `;
        causedBy.forEach((cause) => {
            html += `<br /> ... <strong>${cause.name}</strong>: ${cause.message}`;
        });
        return html;
    }
    /**
     * Returns a HTML-friendly summary for the error or for the chain of errros (if appropriate).
     */
    static html(error) {
        if (error instanceof Err) {
            return error.html();
        }
        else {
            return `Unexpected error of type <strong>${error.name}</strong> occurred: ${error.message}.`;
        }
    }
}
exports.Err = Err;
/**
 * Signals invalid arguments for a function, for an operation.
 */
class ErrInvalidArgument extends Err {
    constructor(name, value, reason = "not specified", inner) {
        super(ErrInvalidArgument.getMessage(name, value, reason), inner);
    }
    static getMessage(name, value, reason) {
        if (value) {
            return `Invalid argument "${name}": ${value}. Reason: ${reason}`;
        }
        return `Invalid argument "${name}"`;
    }
}
exports.ErrInvalidArgument = ErrInvalidArgument;
/**
 * Signals an unsupported operation.
 */
class ErrUnsupportedOperation extends Err {
    constructor(operation, reason = "not specified") {
        super(`Operation "${operation}" not supported. Reason: ${reason}`);
    }
}
exports.ErrUnsupportedOperation = ErrUnsupportedOperation;
/**
 * Signals the provisioning of objects of unexpected (bad) types.
 */
class ErrBadType extends Err {
    constructor(name, type, value) {
        super(`Bad type of "${name}": ${value}. Expected type: ${type}`);
    }
}
exports.ErrBadType = ErrBadType;
/**
 * Signals that an invariant failed.
 */
class ErrInvariantFailed extends Err {
    constructor(message) {
        super(`"Invariant failed: ${message}`);
    }
}
exports.ErrInvariantFailed = ErrInvariantFailed;
/**
 * Signals issues with {@link Address} instantiation.
 */
class ErrAddressCannotCreate extends Err {
    constructor(input, inner) {
        let message = `Cannot create address from: ${input}`;
        super(message, inner);
    }
}
exports.ErrAddressCannotCreate = ErrAddressCannotCreate;
/**
 * Signals issues with the HRP of an {@link Address}.
 */
class ErrAddressBadHrp extends Err {
    constructor(expected, got) {
        super(`Wrong address HRP. Expected: ${expected}, got ${got}`);
    }
}
exports.ErrAddressBadHrp = ErrAddressBadHrp;
/**
 * Signals the presence of an empty / invalid address.
 */
class ErrAddressEmpty extends Err {
    constructor() {
        super(`Address is empty`);
    }
}
exports.ErrAddressEmpty = ErrAddressEmpty;
/**
 * Signals an error related to signing a message (a transaction).
 */
class ErrSignerCannotSign extends Err {
    constructor(inner) {
        super(`Cannot sign`, inner);
    }
}
exports.ErrSignerCannotSign = ErrSignerCannotSign;
/**
 * Signals an invalid value for {@link Balance} objects.
 */
class ErrBalanceInvalid extends Err {
    constructor(value) {
        super(`Invalid balance: ${value.toString()}`);
    }
}
exports.ErrBalanceInvalid = ErrBalanceInvalid;
/**
 * Signals an invalid value for {@link GasPrice} objects.
 */
class ErrGasPriceInvalid extends Err {
    constructor(value) {
        super(`Invalid gas price: ${value}`);
    }
}
exports.ErrGasPriceInvalid = ErrGasPriceInvalid;
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
class ErrGasLimitInvalid extends Err {
    constructor(value) {
        super(`Invalid gas limit: ${value}`);
    }
}
exports.ErrGasLimitInvalid = ErrGasLimitInvalid;
/**
 * Signals an invalid value for {@link GasLimit} objects.
 */
class ErrNotEnoughGas extends Err {
    constructor(value) {
        super(`Not enough gas provided: ${value}`);
    }
}
exports.ErrNotEnoughGas = ErrNotEnoughGas;
/**
 * Signals an invalid value for {@link Nonce} objects.
 */
class ErrNonceInvalid extends Err {
    constructor(value) {
        super(`Invalid nonce: ${value}`);
    }
}
exports.ErrNonceInvalid = ErrNonceInvalid;
/**
 * Signals an invalid value for {@link ChainID} objects.
 */
class ErrChainIDInvalid extends Err {
    constructor(value) {
        super(`Invalid chain ID: ${value}`);
    }
}
exports.ErrChainIDInvalid = ErrChainIDInvalid;
/**
 * Signals an invalid value for {@link TransactionVersion} objects.
 */
class ErrTransactionVersionInvalid extends Err {
    constructor(value) {
        super(`Invalid transaction version: ${value}`);
    }
}
exports.ErrTransactionVersionInvalid = ErrTransactionVersionInvalid;
/**
 * Signals an invalid value for {@link TransactionOptions} objects.
 */
class ErrTransactionOptionsInvalid extends Err {
    constructor(value) {
        super(`Invalid transaction options: ${value}`);
    }
}
exports.ErrTransactionOptionsInvalid = ErrTransactionOptionsInvalid;
/**
 * Signals an invalid value for {@link GasPriceModifier} objects.
 */
class ErrGasPriceModifierInvalid extends Err {
    constructor(value) {
        super(`Invalid gas price modifier: ${value}`);
    }
}
exports.ErrGasPriceModifierInvalid = ErrGasPriceModifierInvalid;
/**
 * Signals that the hash of the {@link Transaction} is not known (not set).
 */
class ErrTransactionHashUnknown extends Err {
    constructor() {
        super(`Transaction hash isn't known`);
    }
}
exports.ErrTransactionHashUnknown = ErrTransactionHashUnknown;
/**
 * Signals that a {@link Transaction} cannot be used within an operation, since it isn't signed.
 */
class ErrTransactionNotSigned extends Err {
    constructor() {
        super(`Transaction isn't signed`);
    }
}
exports.ErrTransactionNotSigned = ErrTransactionNotSigned;
/**
 * Signals an error related to signing a message (a transaction).
 */
class ErrSignatureCannotCreate extends Err {
    constructor(input, inner) {
        let message = `Cannot create signature from: ${input}`;
        super(message, inner);
    }
}
exports.ErrSignatureCannotCreate = ErrSignatureCannotCreate;
/**
 * Signals the usage of an empty signature.
 */
class ErrSignatureEmpty extends Err {
    constructor() {
        super(`Signature is empty`);
    }
}
exports.ErrSignatureEmpty = ErrSignatureEmpty;
/**
 * Signals an invalid value for the name of a {@link ContractFunction}.
 */
class ErrInvalidFunctionName extends Err {
    constructor() {
        super(`Invalid function name`);
    }
}
exports.ErrInvalidFunctionName = ErrInvalidFunctionName;
/**
 * Signals an error that happened during a HTTP GET request.
 */
class ErrApiProviderGet extends Err {
    constructor(url, error, inner) {
        let message = `Cannot GET ${url}: [${error}]`;
        super(message, inner);
    }
}
exports.ErrApiProviderGet = ErrApiProviderGet;
/**
 * Signals an error that happened during a HTTP POST request.
 */
class ErrApiProviderPost extends Err {
    constructor(url, error, inner) {
        let message = `Cannot POST ${url}: [${error}]`;
        super(message, inner);
        this.originalErrorMessage = error || "";
    }
}
exports.ErrApiProviderPost = ErrApiProviderPost;
/**
 * Signals a failed operation, since the Timer is already running.
 */
class ErrAsyncTimerAlreadyRunning extends Err {
    constructor() {
        super("Async timer already running");
    }
}
exports.ErrAsyncTimerAlreadyRunning = ErrAsyncTimerAlreadyRunning;
/**
 * Signals a failed operation, since the Timer has been aborted.
 */
class ErrAsyncTimerAborted extends Err {
    constructor() {
        super("Async timer aborted");
    }
}
exports.ErrAsyncTimerAborted = ErrAsyncTimerAborted;
/**
 * Signals a timout for a {@link TransactionWatcher}.
 */
class ErrTransactionWatcherTimeout extends Err {
    constructor() {
        super(`TransactionWatcher has timed out`);
    }
}
exports.ErrTransactionWatcherTimeout = ErrTransactionWatcherTimeout;
/**
 * Signals an issue related to waiting for a specific {@link TransactionStatus}.
 */
class ErrExpectedTransactionStatusNotReached extends Err {
    constructor() {
        super(`Expected transaction status not reached`);
    }
}
exports.ErrExpectedTransactionStatusNotReached = ErrExpectedTransactionStatusNotReached;
/**
 * Signals a generic error in the context of Smart Contracts.
 */
class ErrContract extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrContract = ErrContract;
/**
 * Signals a generic error in the context of querying Smart Contracts.
 */
class ErrContractQuery extends Err {
    constructor(message) {
        super(message);
    }
    static increaseSpecificity(err) {
        if (err instanceof ErrApiProviderPost) {
            if (err.originalErrorMessage.indexOf("error running vm func")) {
                let newErrorMessage = err.originalErrorMessage
                    .replace(new RegExp("executeQuery:", "g"), "")
                    .trim();
                return new ErrContractQuery(newErrorMessage);
            }
        }
        return err;
    }
}
exports.ErrContractQuery = ErrContractQuery;
/**
 * Signals an error thrown by the mock-like test objects.
 */
class ErrMock extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrMock = ErrMock;
/**
 * Signals an error thrown when setting up a test.
 */
class ErrTest extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrTest = ErrTest;
/**
 * Signals a generic serialization error.
 */
class ErrSerialization extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrSerialization = ErrSerialization;
/**
 * Signals a generic type error.
 */
class ErrTypingSystem extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrTypingSystem = ErrTypingSystem;
/**
 * Signals a generic struct typing error.
 */
class ErrStructTyping extends Err {
    constructor(reason) {
        super(`Incorrect struct typing: ${reason}`);
    }
}
exports.ErrStructTyping = ErrStructTyping;
/**
 * Signals a generic codec (encode / decode) error.
 */
class ErrCodec extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrCodec = ErrCodec;
/**
 * Signals a generic wallet error.
 */
class ErrWallet extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrWallet = ErrWallet;
/**
 * Signals a wrong mnemonic format.
 */
class ErrWrongMnemonic extends ErrWallet {
    constructor() {
        super("Wrong mnemonic format");
    }
}
exports.ErrWrongMnemonic = ErrWrongMnemonic;
/**
 * Signals a generic contract interaction error.
 */
class ErrContractInteraction extends Err {
    constructor(message) {
        super(message);
    }
}
exports.ErrContractInteraction = ErrContractInteraction;
/**
 * Signals a bad PEM file.
 */
class ErrBadPEM extends ErrWallet {
    constructor(message) {
        super(message ? `Bad PEM: ${message}` : `Bad PEM`);
    }
}
exports.ErrBadPEM = ErrBadPEM;
/**
 * Signals an invalid smart contract call data field
 */
class ErrInvalidScCallDataField extends Err {
    constructor(message) {
        message = " " + message ? message : 0;
        super("Invalid smart contract call data field" + message);
    }
}
exports.ErrInvalidScCallDataField = ErrInvalidScCallDataField;
/**
 * Signals an invalid ESDT transfer data field
 */
class ErrInvalidEsdtTransferDataField extends Err {
    constructor() {
        super("Invalid ESDT transfer call data field");
    }
}
exports.ErrInvalidEsdtTransferDataField = ErrInvalidEsdtTransferDataField;
/**
 * Signals that a method is not yet implemented
 */
class ErrNotImplemented extends Err {
    constructor() {
        super("Method not yet implemented");
    }
}
exports.ErrNotImplemented = ErrNotImplemented;
/**
 * Signals that the data inside the url is not a valid one for a transaction sign response
 */
class ErrInvalidTxSignReturnValue extends Err {
    constructor() {
        super("Invalid response in transaction sign return url");
    }
}
exports.ErrInvalidTxSignReturnValue = ErrInvalidTxSignReturnValue;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ 5553:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["None"] = 5] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    static setLevel(logLevel) {
        Logger.logLevel = logLevel;
    }
    static trace(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Debug) {
            return;
        }
        console.debug(message, optionalParams);
    }
    static debug(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Debug) {
            return;
        }
        console.debug(message, optionalParams);
    }
    static info(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Info) {
            return;
        }
        console.log(message, optionalParams);
    }
    static warn(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Warn) {
            return;
        }
        console.warn(message, optionalParams);
    }
    static error(message, ...optionalParams) {
        if (Logger.logLevel >= LogLevel.Error) {
            return;
        }
        console.error(message, optionalParams);
    }
}
exports.Logger = Logger;
Logger.logLevel = LogLevel.Debug;
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ 5954:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionWatcher = void 0;
const asyncTimer_1 = __webpack_require__(3377);
const errors = __importStar(__webpack_require__(7902));
const logger_1 = __webpack_require__(5553);
/**
 * TransactionWatcher allows one to continuously watch (monitor), by means of polling, the status of a given transaction.
 */
class TransactionWatcher {
    /**
     *
     * @param hash The hash of the transaction to watch
     * @param provider The provider to query the status from
     * @param pollingInterval The polling interval, in milliseconds
     * @param timeout The timeout, in milliseconds
     */
    constructor(hash, provider, pollingInterval = TransactionWatcher.DefaultPollingInterval, timeout = TransactionWatcher.DefaultTimeout) {
        this.hash = hash;
        this.provider = provider;
        this.pollingInterval = pollingInterval;
        this.timeout = timeout;
    }
    /**
     * Waits until the transaction reaches the "pending" status.
     */
    awaitPending(onStatusReceived) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awaitStatus(status => status.isPending(), onStatusReceived || TransactionWatcher.NoopOnStatusReceived);
        });
    }
    /**
      * Waits until the transaction reaches the "executed" status.
      */
    awaitExecuted(onStatusReceived) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.awaitStatus(status => status.isExecuted(), onStatusReceived || TransactionWatcher.NoopOnStatusReceived);
        });
    }
    /**
     * Waits until the predicate over the transaction status evaluates to "true".
     * @param isAwaitedStatus A predicate over the status
     */
    awaitStatus(isAwaitedStatus, onStatusReceived) {
        return __awaiter(this, void 0, void 0, function* () {
            let doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.provider.getTransactionStatus(this.hash); });
            let errorProvider = () => new errors.ErrExpectedTransactionStatusNotReached();
            return this.awaitConditionally(isAwaitedStatus, doFetch, onStatusReceived, errorProvider);
        });
    }
    awaitNotarized() {
        return __awaiter(this, void 0, void 0, function* () {
            let isNotarized = (data) => !data.hyperblockHash.isEmpty();
            let doFetch = () => __awaiter(this, void 0, void 0, function* () { return yield this.provider.getTransaction(this.hash); });
            let errorProvider = () => new errors.ErrTransactionWatcherTimeout();
            return this.awaitConditionally(isNotarized, doFetch, (_) => { }, errorProvider);
        });
    }
    awaitConditionally(isSatisfied, doFetch, onFetched, createError) {
        return __awaiter(this, void 0, void 0, function* () {
            let periodicTimer = new asyncTimer_1.AsyncTimer("watcher:periodic");
            let timeoutTimer = new asyncTimer_1.AsyncTimer("watcher:timeout");
            let stop = false;
            let fetchedData = undefined;
            let _ = timeoutTimer.start(this.timeout).finally(() => {
                timeoutTimer.stop();
                stop = true;
            });
            while (!stop) {
                try {
                    fetchedData = yield doFetch();
                    if (onFetched) {
                        onFetched(fetchedData);
                    }
                    if (isSatisfied(fetchedData) || stop) {
                        break;
                    }
                }
                catch (error) {
                    if (!(error instanceof errors.Err)) {
                        throw error;
                    }
                    logger_1.Logger.info("cannot (yet) fetch data");
                }
                yield periodicTimer.start(this.pollingInterval);
            }
            if (!timeoutTimer.isStopped()) {
                timeoutTimer.stop();
            }
            let notSatisfied = !fetchedData || !isSatisfied(fetchedData);
            if (notSatisfied) {
                let error = createError();
                throw error;
            }
        });
    }
}
exports.TransactionWatcher = TransactionWatcher;
TransactionWatcher.DefaultPollingInterval = 6000;
TransactionWatcher.DefaultTimeout = TransactionWatcher.DefaultPollingInterval * 15;
TransactionWatcher.NoopOnStatusReceived = (_) => { };
//# sourceMappingURL=transactionWatcher.js.map

/***/ }),

/***/ 9742:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 8764:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(9742)
const ieee754 = __webpack_require__(645)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = (__webpack_require__(8710).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 8533:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = (__webpack_require__(2092).forEach);
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 2092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(9974);
var uncurryThis = __webpack_require__(1702);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var arraySpeciesCreate = __webpack_require__(5417);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 1194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 9341:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 1589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ 206:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 7475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isArray = __webpack_require__(3157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(111);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 5417:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(7475);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 7235:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(857);
var hasOwn = __webpack_require__(2597);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineProperty = (__webpack_require__(3070).f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 8324:
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(317);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var uncurryThis = __webpack_require__(1702);
var redefine = __webpack_require__(1320);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    redefine(String.prototype, KEY, methods[0]);
    redefine(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 2104:
/***/ (function(module) {

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 9974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 6916:
/***/ (function(module) {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module) {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(648);
var getBuiltIn = __webpack_require__(5005);
var inspectSource = __webpack_require__(2788);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 30:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var defineProperties = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(4326);
var toIndexedObject = __webpack_require__(5656);
var $getOwnPropertyNames = (__webpack_require__(8006).f);
var arraySlice = __webpack_require__(1589);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classof = __webpack_require__(648);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = global;


/***/ }),

/***/ 1320:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var setGlobal = __webpack_require__(3505);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 7651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 2261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(1340);
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = (__webpack_require__(9909).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(7168);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ 9441:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 7168:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 1150:
/***/ (function(module) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 3505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 8003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 8710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(9303);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 8415:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7854);
var toIntegerOrInfinity = __webpack_require__(9303);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ 3111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var whitespaces = __webpack_require__(1361);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 863:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var requireObjectCoercible = __webpack_require__(4488);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var classof = __webpack_require__(648);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 6061:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 1361:
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 2222:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var fails = __webpack_require__(7293);
var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);
var arraySpeciesCreate = __webpack_require__(5417);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 7327:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $filter = (__webpack_require__(2092).filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 561:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var toAbsoluteIndex = __webpack_require__(1400);
var toIntegerOrInfinity = __webpack_require__(9303);
var lengthOfArrayLike = __webpack_require__(6244);
var toObject = __webpack_require__(7908);
var arraySpeciesCreate = __webpack_require__(5417);
var createProperty = __webpack_require__(6135);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 8309:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var FUNCTION_NAME_EXISTS = (__webpack_require__(6530).EXISTS);
var uncurryThis = __webpack_require__(1702);
var defineProperty = (__webpack_require__(3070).f);

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 941:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isForced = __webpack_require__(4705);
var redefine = __webpack_require__(1320);
var hasOwn = __webpack_require__(2597);
var inheritIfRequired = __webpack_require__(9587);
var isPrototypeOf = __webpack_require__(7976);
var isSymbol = __webpack_require__(2190);
var toPrimitive = __webpack_require__(7593);
var fails = __webpack_require__(7293);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var defineProperty = (__webpack_require__(3070).f);
var thisNumberValue = __webpack_require__(863);
var trim = (__webpack_require__(3111).trim);

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ 6977:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(9303);
var thisNumberValue = __webpack_require__(863);
var $repeat = __webpack_require__(8415);
var fails = __webpack_require__(7293);

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ 5003:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyDescriptor = (__webpack_require__(1236).f);
var DESCRIPTORS = __webpack_require__(9781);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 9337:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var ownKeys = __webpack_require__(3887);
var toIndexedObject = __webpack_require__(5656);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var createProperty = __webpack_require__(6135);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 7941:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var nativeKeys = __webpack_require__(1956);
var fails = __webpack_require__(7293);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 1539:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var redefine = __webpack_require__(1320);
var toString = __webpack_require__(288);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 4916:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 8757:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(4488);
var isCallable = __webpack_require__(614);
var isRegExp = __webpack_require__(7850);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var regExpFlags = __webpack_require__(7066);
var getSubstitution = __webpack_require__(647);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var REPLACE = wellKnownSymbol('replace');
var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;
var getFlags = uncurryThis(regExpFlags);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (searchValue != null) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible('flags' in RegExpPrototype
          ? searchValue.flags
          : getFlags(searchValue)
        ));
        if (!~indexOf(flags, 'g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ 5306:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var fails = __webpack_require__(7293);
var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var toIntegerOrInfinity = __webpack_require__(9303);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var getMethod = __webpack_require__(8173);
var getSubstitution = __webpack_require__(647);
var regExpExec = __webpack_require__(7651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 4765:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(6916);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var sameValue = __webpack_require__(1150);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var regExpExec = __webpack_require__(7651);

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ 2526:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_SYMBOL = __webpack_require__(133);
var fails = __webpack_require__(7293);
var hasOwn = __webpack_require__(2597);
var isArray = __webpack_require__(3157);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var isPrototypeOf = __webpack_require__(7976);
var isSymbol = __webpack_require__(2190);
var anObject = __webpack_require__(9670);
var toObject = __webpack_require__(7908);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var $toString = __webpack_require__(1340);
var createPropertyDescriptor = __webpack_require__(9114);
var nativeObjectCreate = __webpack_require__(30);
var objectKeys = __webpack_require__(1956);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);
var propertyIsEnumerableModule = __webpack_require__(5296);
var arraySlice = __webpack_require__(206);
var redefine = __webpack_require__(1320);
var shared = __webpack_require__(2309);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var uid = __webpack_require__(9711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineWellKnownSymbol = __webpack_require__(7235);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);
var $forEach = (__webpack_require__(2092).forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 7207:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(8757);


/***/ }),

/***/ 4747:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var forEach = __webpack_require__(8533);
var createNonEnumerableProperty = __webpack_require__(8880);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ 4528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vue3rdj5{color:#474340;font-family:inherit;font-size:10px}.vue3rdj5__modes{margin:0 auto;max-width:500px}.vue3rdj5__modes-open{align-items:center;background:#eee;border:none;cursor:pointer;display:flex;font-size:2.2em;font-weight:600;justify-content:center;margin-top:16px;min-height:80px;padding:16px;width:100%}.vue3rdj5__modes-open span{margin-right:4px}.vue3rdj5__modes-open-active{background:#f5f5f5}.vue3rdj5__modes-logo{margin-right:12px;max-width:48px}.vue3rdj5__modes-logo-ledger{margin:0 14px 0 2px;max-width:44px}.vue3rdj5__mode{background:#f5f5f5;margin:0 auto 16px;padding:1px 16px 16px;width:100%}.vue3rdj5__mode-link{align-items:center;background:#474340;color:#fff;cursor:pointer;display:flex;font-family:inherit;font-size:1.9em;font-weight:600;justify-content:center;margin:16px auto 0;max-width:470px;min-width:150px;padding:12px;text-align:center;text-decoration:none;width:100%}.vue3rdj5__mode-link-maiar{background:#1942b9}.vue3rdj5__mode-qr{margin:0 auto;max-width:300px}.vue3rdj5__mode-error{display:flex;font-family:inherit;font-size:1.9em;font-weight:600;justify-content:center;width:100%;color:#a13341}.vue3rdj5__infos{display:flex;flex-direction:column;font-family:inherit;font-size:1.9em;font-weight:600;justify-content:center;width:100%}.vue3rdj5__infos-txt{width:100%}.vue3rdj5__infos-link{text-decoration:none;cursor:pointer;padding:5px 10px;background-color:#474340;color:white;border-radius:8px;border:white solid 1px}.vue3rdj5__infos-link:hover,.vue3rdj5__infos-link:active{background-color:white;color:#474340;border:black solid 1px}.vue3rdj5__ledger-item{margin-top:8px;padding:4px}.vue3rdj5__ledger-link{background:#fff;color:#474340;display:block;font-size:1.2rem;overflow:hidden;padding:8px 12px;position:relative;text-decoration:none;text-overflow:ellipsis}.vue3rdj5__logged{margin:0 auto 16px;max-width:300px;width:100%;text-align:center}.vue3rdj5__logged-address{font-size:2em;padding:16px}.vue3rdj5__logged-logout{background:#474340;border:0;color:#fff;cursor:pointer;font-family:inherit;font-size:1.9em;font-weight:600;justify-content:center;margin-top:16px;padding:12px;text-align:center;text-decoration:none;width:100%}.mint-section{margin-top:10vh;color:white;font-size:large}@media screen and (min-width: 1200px){.vue3rdj5__modes{align-items:flex-start;display:flex;flex-wrap:wrap;margin:0 auto;max-width:1200px;min-height:585px}.vue3rdj5__modes-open{margin:0 12px;width:calc(25% - 24px)}.vue3rdj5__mode{align-items:center;display:flex;margin:0 auto;min-height:505px;order:100;padding:52px 24px;width:calc(100% - 24px)}.vue3rdj5__mode-qr{max-width:400px;width:100%}.vue3rdj5__ledger{margin:0 auto;max-width:800px}.mint-section{margin-top:10vh;color:white;font-size:large}}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 8081:
/***/ (function(module) {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 7484:
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ 5987:
/***/ (function(module) {

"use strict";


/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (true) {
  module.exports = dijkstra;
}


/***/ }),

/***/ 2378:
/***/ (function(module) {

"use strict";


module.exports = function encodeUtf8 (input) {
  var result = []
  var size = input.length

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index)

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1)

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
        index += 1
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point)
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192)
      result.push((point & 63) | 128)
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240)
      result.push(((point >> 12) & 63) | 128)
      result.push(((point >> 6) & 63) | 128)
      result.push((point & 63) | 128)
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD)
  }

  return new Uint8Array(result).buffer
}


/***/ }),

/***/ 645:
/***/ (function(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 1795:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Platform.js v1.3.6
 * Copyright 2014-2020 Benjamin Tan
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes["object"] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof __webpack_require__.g == 'object' && __webpack_require__.g;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': '(?:Edge|Edg|EdgA|EdgiOS)' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Vivaldi',
      'Waterfox',
      'WebPositive',
      { 'label': 'Yandex Browser', 'pattern': 'YaBrowser' },
      { 'label': 'UC Browser', 'pattern': 'UCBrowser' },
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chromium',
      'Chrome',
      { 'label': 'Chrome', 'pattern': '(?:HeadlessChrome)' },
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Alcatel': {},
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'Huawei': {},
      'Lenovo': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Oppo': {},
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 },
      'Xiaomi': { 'Mi': 1, 'Redmi': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'KaiOS',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      { 'label': 'DragonFly BSD', 'pattern': 'DragonFly' },
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect Android products.
    // Browsers on Android devices typically provide their product IDS after "Android;"
    // up to "Build" or ") AppleWebKit".
    // Example:
    // "Mozilla/5.0 (Linux; Android 8.1.0; Moto G (5) Plus) AppleWebKit/537.36
    // (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36"
    if (/\bAndroid\b/.test(os) && !product &&
        (data = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(ua))) {
      product = trim(data[1])
        // Replace any language codes (eg. "en-US").
        .replace(/^[a-z]{2}-[a-z]{2};\s*/i, '')
        || null;
    }
    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    } else if (manufacturer && product) {
      product = product
        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.\\s]', 'i'), manufacturer + ' ')
        .replace(RegExp('^(' + qualify(manufacturer) + ')[-_.]?(\\w)', 'i'), manufacturer + ' $2');
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && /^Linux\b/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect UC Browser speed mode.
    else if (name == 'UC Browser' && /\bUCWEB\b/.test(ua)) {
      description.push('speed mode');
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (rhino) {
          try {
            version = context.require('ringo/engine').version.join('.');
            name = 'RingoJS';
          } catch(e) {
            if ((data = context.system) && data.global.system == context.system) {
              name = 'Narwhal';
              os || (os = data[0].os || null);
            }
          }
          if (!name) {
            name = 'Rhino';
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          }
          if (!name) {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version);
            version = version ? version[0] : null;
          }
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS|KaiOS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : data < 602 ? 9 : data < 604 ? 10 : data < 606 ? 11 : data < 608 ? 12 : '12');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      } else if (name == 'Chrome' && /\bHeadlessChrome/i.test(ua)) {
        description.unshift('headless');
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Newer versions of SRWare Iron uses the Chrome tag to indicate its version number.
    else if (/\bSRWare Iron\b/.test(name) && !version) {
      version = getVersion('Chrome');
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Ensure OS does not include the browser name.
    if (os && os.indexOf(name) != -1 && !RegExp(name + ' OS').test(os)) {
      os = os.replace(RegExp(' *' + qualify(name) + ' *'), '');
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Linux", "Ubuntu", "Debian", "Fedora", "Red Hat",
       * "SuSE", "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (true) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return platform;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else {}
}.call(this));


/***/ }),

/***/ 4155:
/***/ (function(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 2592:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


const canPromise = __webpack_require__(7138)

const QRCode = __webpack_require__(5115)
const CanvasRenderer = __webpack_require__(6907)
const SvgRenderer = __webpack_require__(3776)

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1)
  const argsNum = args.length
  const isLastArgCb = typeof args[argsNum - 1] === 'function'

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts
        opts = undefined
      } else {
        cb = opts
        opts = text
        text = canvas
        canvas = undefined
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas
      canvas = opts = undefined
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text
      text = canvas
      canvas = undefined
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts)
        resolve(renderFunc(data, canvas, opts))
      } catch (e) {
        reject(e)
      }
    })
  }

  try {
    const data = QRCode.create(text, opts)
    cb(null, renderFunc(data, canvas, opts))
  } catch (e) {
    cb(e)
  }
}

exports.create = QRCode.create
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render)
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL)

// only svg for now.
exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
})


/***/ }),

/***/ 7138:
/***/ (function(module) {

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
}


/***/ }),

/***/ 1845:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

const getSymbolSize = (__webpack_require__(242).getSymbolSize)

/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */
exports.getRowColCoords = function getRowColCoords (version) {
  if (version === 1) return []

  const posCount = Math.floor(version / 7) + 2
  const size = getSymbolSize(version)
  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2
  const positions = [size - 7] // Last coord is always (size - 7)

  for (let i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals
  }

  positions.push(6) // First coord is always 6

  return positions.reverse()
}

/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const coords = []
  const pos = exports.getRowColCoords(version)
  const posLength = pos.length

  for (let i = 0; i < posLength; i++) {
    for (let j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if ((i === 0 && j === 0) || // top-left
          (i === 0 && j === posLength - 1) || // bottom-left
          (i === posLength - 1 && j === 0)) { // top-right
        continue
      }

      coords.push([pos[i], pos[j]])
    }
  }

  return coords
}


/***/ }),

/***/ 8260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(6910)

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
]

function AlphanumericData (data) {
  this.mode = Mode.ALPHANUMERIC
  this.data = data
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
}

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
}

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
}

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1])

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11)
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6)
  }
}

module.exports = AlphanumericData


/***/ }),

/***/ 7245:
/***/ (function(module) {

function BitBuffer () {
  this.buffer = []
  this.length = 0
}

BitBuffer.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8)
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1)
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8)
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0)
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8))
    }

    this.length++
  }
}

module.exports = BitBuffer


/***/ }),

/***/ 3280:
/***/ (function(module) {

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */
function BitMatrix (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size
  this.data = new Uint8Array(size * size)
  this.reservedBit = new Uint8Array(size * size)
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col
  this.data[index] = value
  if (reserved) this.reservedBit[index] = true
}

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
}

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value
}

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
}

module.exports = BitMatrix


/***/ }),

/***/ 3424:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const encodeUtf8 = __webpack_require__(2378)
const Mode = __webpack_require__(6910)

function ByteData (data) {
  this.mode = Mode.BYTE
  this.data = new Uint8Array(encodeUtf8(data))
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
}

ByteData.prototype.getLength = function getLength () {
  return this.data.length
}

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
}

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8)
  }
}

module.exports = ByteData


/***/ }),

/***/ 5393:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const ECLevel = __webpack_require__(4908)

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
]

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
]

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
exports.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
exports.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
}


/***/ }),

/***/ 4908:
/***/ (function(__unused_webpack_module, exports) {

exports.L = { bit: 1 }
exports.M = { bit: 0 }
exports.Q = { bit: 3 }
exports.H = { bit: 2 }

function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L

    case 'm':
    case 'medium':
      return exports.M

    case 'q':
    case 'quartile':
      return exports.Q

    case 'h':
    case 'high':
      return exports.H

    default:
      throw new Error('Unknown EC Level: ' + string)
  }
}

exports.isValid = function isValid (level) {
  return level && typeof level.bit !== 'undefined' &&
    level.bit >= 0 && level.bit < 4
}

exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ 6526:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const getSymbolSize = (__webpack_require__(242).getSymbolSize)
const FINDER_PATTERN_SIZE = 7

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
exports.getPositions = function getPositions (version) {
  const size = getSymbolSize(version)

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
}


/***/ }),

/***/ 1642:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(242)

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1)
const G15_BCH = Utils.getBCHDigit(G15)

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
exports.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask)
  let d = data << 10

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils.getBCHDigit(d) - G15_BCH))
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
}


/***/ }),

/***/ 9729:
/***/ (function(__unused_webpack_module, exports) {

const EXP_TABLE = new Uint8Array(512)
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x
    LOG_TABLE[x] = i

    x <<= 1 // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255]
  }
}())

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
}

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
exports.exp = function exp (n) {
  return EXP_TABLE[n]
}

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
exports.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
}


/***/ }),

/***/ 5442:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(6910)
const Utils = __webpack_require__(242)

function KanjiData (data) {
  this.mode = Mode.KANJI
  this.data = data
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
}

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
}

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
}

KanjiData.prototype.write = function (bitBuffer) {
  let i

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils.toSJIS(this.data[i])

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff)

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13)
  }
}

module.exports = KanjiData


/***/ }),

/***/ 7126:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}

/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */
const PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
}

/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */
exports.isValid = function isValid (mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
}

/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */
exports.from = function from (value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined
}

/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/
exports.getPenaltyN1 = function getPenaltyN1 (data) {
  const size = data.size
  let points = 0
  let sameCountCol = 0
  let sameCountRow = 0
  let lastCol = null
  let lastRow = null

  for (let row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0
    lastCol = lastRow = null

    for (let col = 0; col < size; col++) {
      let module = data.get(row, col)
      if (module === lastCol) {
        sameCountCol++
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
        lastCol = module
        sameCountCol = 1
      }

      module = data.get(col, row)
      if (module === lastRow) {
        sameCountRow++
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
        lastRow = module
        sameCountRow = 1
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5)
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5)
  }

  return points
}

/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */
exports.getPenaltyN2 = function getPenaltyN2 (data) {
  const size = data.size
  let points = 0

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const last = data.get(row, col) +
        data.get(row, col + 1) +
        data.get(row + 1, col) +
        data.get(row + 1, col + 1)

      if (last === 4 || last === 0) points++
    }
  }

  return points * PenaltyScores.N2
}

/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */
exports.getPenaltyN3 = function getPenaltyN3 (data) {
  const size = data.size
  let points = 0
  let bitsCol = 0
  let bitsRow = 0

  for (let row = 0; row < size; row++) {
    bitsCol = bitsRow = 0
    for (let col = 0; col < size; col++) {
      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col)
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++

      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row)
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++
    }
  }

  return points * PenaltyScores.N3
}

/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */
exports.getPenaltyN4 = function getPenaltyN4 (data) {
  let darkCount = 0
  const modulesCount = data.data.length

  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i]

  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10)

  return k * PenaltyScores.N4
}

/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */
function getMaskAt (maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
    case exports.Patterns.PATTERN001: return i % 2 === 0
    case exports.Patterns.PATTERN010: return j % 3 === 0
    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

    default: throw new Error('bad maskPattern:' + maskPattern)
  }
}

/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */
exports.applyMask = function applyMask (pattern, data) {
  const size = data.size

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue
      data.xor(row, col, getMaskAt(pattern, row, col))
    }
  }
}

/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */
exports.getBestMask = function getBestMask (data, setupFormatFunc) {
  const numPatterns = Object.keys(exports.Patterns).length
  let bestPattern = 0
  let lowerPenalty = Infinity

  for (let p = 0; p < numPatterns; p++) {
    setupFormatFunc(p)
    exports.applyMask(p, data)

    // Calculate penalty
    const penalty =
      exports.getPenaltyN1(data) +
      exports.getPenaltyN2(data) +
      exports.getPenaltyN3(data) +
      exports.getPenaltyN4(data)

    // Undo previously applied mask
    exports.applyMask(p, data)

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty
      bestPattern = p
    }
  }

  return bestPattern
}


/***/ }),

/***/ 6910:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const VersionCheck = __webpack_require__(3114)
const Regex = __webpack_require__(7116)

/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */
exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
}

/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */
exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
}

/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */
exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
}

/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */
exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
}

/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */
exports.MIXED = {
  bit: -1
}

/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */
exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version)
  }

  if (version >= 1 && version < 10) return mode.ccBits[0]
  else if (version < 27) return mode.ccBits[1]
  return mode.ccBits[2]
}

/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */
exports.getBestModeForData = function getBestModeForData (dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
  else if (Regex.testKanji(dataStr)) return exports.KANJI
  else return exports.BYTE
}

/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */
exports.toString = function toString (mode) {
  if (mode && mode.id) return mode.id
  throw new Error('Invalid mode')
}

/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */
exports.isValid = function isValid (mode) {
  return mode && mode.bit && mode.ccBits
}

/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */
function fromString (string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string')
  }

  const lcStr = string.toLowerCase()

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC
    case 'alphanumeric':
      return exports.ALPHANUMERIC
    case 'kanji':
      return exports.KANJI
    case 'byte':
      return exports.BYTE
    default:
      throw new Error('Unknown mode: ' + string)
  }
}

/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */
exports.from = function from (value, defaultValue) {
  if (exports.isValid(value)) {
    return value
  }

  try {
    return fromString(value)
  } catch (e) {
    return defaultValue
  }
}


/***/ }),

/***/ 1085:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Mode = __webpack_require__(6910)

function NumericData (data) {
  this.mode = Mode.NUMERIC
  this.data = data.toString()
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
}

NumericData.prototype.getLength = function getLength () {
  return this.data.length
}

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
}

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3)
    value = parseInt(group, 10)

    bitBuffer.put(value, 10)
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i
  if (remainingNum > 0) {
    group = this.data.substr(i)
    value = parseInt(group, 10)

    bitBuffer.put(value, remainingNum * 3 + 1)
  }
}

module.exports = NumericData


/***/ }),

/***/ 6143:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const GF = __webpack_require__(9729)

/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */
exports.mul = function mul (p1, p2) {
  const coeff = new Uint8Array(p1.length + p2.length - 1)

  for (let i = 0; i < p1.length; i++) {
    for (let j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j])
    }
  }

  return coeff
}

/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */
exports.mod = function mod (divident, divisor) {
  let result = new Uint8Array(divident)

  while ((result.length - divisor.length) >= 0) {
    const coeff = result[0]

    for (let i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff)
    }

    // remove all zeros from buffer head
    let offset = 0
    while (offset < result.length && result[offset] === 0) offset++
    result = result.slice(offset)
  }

  return result
}

/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */
exports.generateECPolynomial = function generateECPolynomial (degree) {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]))
  }

  return poly
}


/***/ }),

/***/ 5115:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(242)
const ECLevel = __webpack_require__(4908)
const BitBuffer = __webpack_require__(7245)
const BitMatrix = __webpack_require__(3280)
const AlignmentPattern = __webpack_require__(1845)
const FinderPattern = __webpack_require__(6526)
const MaskPattern = __webpack_require__(7126)
const ECCode = __webpack_require__(5393)
const ReedSolomonEncoder = __webpack_require__(2882)
const Version = __webpack_require__(3103)
const FormatInfo = __webpack_require__(1642)
const Mode = __webpack_require__(6910)
const Segments = __webpack_require__(6130)

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size
  const pos = FinderPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0
    matrix.set(r, 6, value, true)
    matrix.set(6, r, value, true)
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version)

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0]
    const col = pos[i][1]

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true)
        } else {
          matrix.set(row + r, col + c, false, true)
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size
  const bits = Version.getEncodedBits(version)
  let row, col, mod

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3)
    col = i % 3 + size - 8 - 3
    mod = ((bits >> i) & 1) === 1

    matrix.set(row, col, mod, true)
    matrix.set(col, row, mod, true)
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern)
  let i, mod

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true)
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true)
    } else {
      matrix.set(size - 15 + i, 8, mod, true)
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true)
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true)
    } else {
      matrix.set(8, 15 - i - 1, mod, true)
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true)
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size
  let inc = -1
  let row = size - 1
  let bitIndex = 7
  let byteIndex = 0

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1)
          }

          matrix.set(row, col - c, dark)
          bitIndex--

          if (bitIndex === -1) {
            byteIndex++
            bitIndex = 7
          }
        }
      }

      row += inc

      if (row < 0 || size <= row) {
        row -= inc
        inc = -inc
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer()

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4)

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version))

    // add binary data sequence to buffer
    data.write(buffer)
  })

  // Calculate required number of bits
  const totalCodewords = Utils.getSymbolTotalCodewords(version)
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4)
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0)
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8)
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel)

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks)

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks)
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount)

  let offset = 0
  const dcData = new Array(ecTotalBlocks)
  const ecData = new Array(ecTotalBlocks)
  let maxDataSize = 0
  const buffer = new Uint8Array(bitBuffer.buffer)

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize)

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b])

    offset += dataSize
    maxDataSize = Math.max(maxDataSize, dataSize)
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords)
  let index = 0
  let i, r

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i]
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i]
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data)
  } else if (typeof data === 'string') {
    let estimatedVersion = version

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data)

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel)
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40)
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel)

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments)

  // Allocate matrix buffer
  const moduleCount = Utils.getSymbolSize(version)
  const modules = new BitMatrix(moduleCount)

  // Add function modules
  setupFinderPattern(modules, version)
  setupTimingPattern(modules)
  setupAlignmentPattern(modules, version)

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0)

  if (version >= 7) {
    setupVersionInfo(modules, version)
  }

  // Add data codewords
  setupData(modules, dataBits)

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel))
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules)

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern)

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
exports.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M
  let version
  let mask

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M)
    version = Version.from(options.version)
    mask = MaskPattern.from(options.maskPattern)

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc)
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
}


/***/ }),

/***/ 2882:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Polynomial = __webpack_require__(6143)

function ReedSolomonEncoder (degree) {
  this.genPoly = undefined
  this.degree = degree

  if (this.degree) this.initialize(this.degree)
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree
  this.genPoly = Polynomial.generateECPolynomial(this.degree)
}

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree)
  paddedData.set(data)

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly)

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length
  if (start > 0) {
    const buff = new Uint8Array(this.degree)
    buff.set(remainder, start)

    return buff
  }

  return remainder
}

module.exports = ReedSolomonEncoder


/***/ }),

/***/ 7116:
/***/ (function(__unused_webpack_module, exports) {

const numeric = '[0-9]+'
const alphanumeric = '[A-Z $%*+\\-./:]+'
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'
kanji = kanji.replace(/u/g, '\\u')

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+'

exports.KANJI = new RegExp(kanji, 'g')
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')
exports.BYTE = new RegExp(byte, 'g')
exports.NUMERIC = new RegExp(numeric, 'g')
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g')

const TEST_KANJI = new RegExp('^' + kanji + '$')
const TEST_NUMERIC = new RegExp('^' + numeric + '$')
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')

exports.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
}

exports.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
}

exports.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
}


/***/ }),

/***/ 6130:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Mode = __webpack_require__(6910)
const NumericData = __webpack_require__(1085)
const AlphanumericData = __webpack_require__(8260)
const ByteData = __webpack_require__(3424)
const KanjiData = __webpack_require__(5442)
const Regex = __webpack_require__(7116)
const Utils = __webpack_require__(242)
const dijkstra = __webpack_require__(5987)

/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */
function getStringByteLength (str) {
  return unescape(encodeURIComponent(str)).length
}

/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */
function getSegments (regex, mode, str) {
  const segments = []
  let result

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    })
  }

  return segments
}

/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */
function getSegmentsFromString (dataStr) {
  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr)
  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr)
  let byteSegs
  let kanjiSegs

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr)
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr)
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr)
    kanjiSegs = []
  }

  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs)

  return segs
    .sort(function (s1, s2) {
      return s1.index - s2.index
    })
    .map(function (obj) {
      return {
        data: obj.data,
        mode: obj.mode,
        length: obj.length
      }
    })
}

/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */
function getSegmentBitsLength (length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length)
    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length)
    case Mode.KANJI:
      return KanjiData.getBitsLength(length)
    case Mode.BYTE:
      return ByteData.getBitsLength(length)
  }
}

/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function mergeSegments (segs) {
  return segs.reduce(function (acc, curr) {
    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null
    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data
      return acc
    }

    acc.push(curr)
    return acc
  }, [])
}

/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */
function buildNodes (segs) {
  const nodes = []
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.ALPHANUMERIC:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: seg.length }
        ])
        break
      case Mode.KANJI:
        nodes.push([seg,
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
        break
      case Mode.BYTE:
        nodes.push([
          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
        ])
    }
  }

  return nodes
}

/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */
function buildGraph (nodes, version) {
  const table = {}
  const graph = { start: {} }
  let prevNodeIds = ['start']

  for (let i = 0; i < nodes.length; i++) {
    const nodeGroup = nodes[i]
    const currentNodeIds = []

    for (let j = 0; j < nodeGroup.length; j++) {
      const node = nodeGroup[j]
      const key = '' + i + j

      currentNodeIds.push(key)
      table[key] = { node: node, lastCount: 0 }
      graph[key] = {}

      for (let n = 0; n < prevNodeIds.length; n++) {
        const prevNodeId = prevNodeIds[n]

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] =
            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode)

          table[prevNodeId].lastCount += node.length
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length

          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
            4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds
  }

  for (let n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]].end = 0
  }

  return { map: graph, table: table }
}

/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */
function buildSingleSegment (data, modesHint) {
  let mode
  const bestMode = Mode.getBestModeForData(data)

  mode = Mode.from(modesHint, bestMode)

  // Make sure data can be encoded
  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' +
      ' cannot be encoded with mode ' + Mode.toString(mode) +
      '.\n Suggested mode is: ' + Mode.toString(bestMode))
  }

  // Use Mode.BYTE if Kanji support is disabled
  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data)

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data)

    case Mode.KANJI:
      return new KanjiData(data)

    case Mode.BYTE:
      return new ByteData(data)
  }
}

/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */
exports.fromArray = function fromArray (array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null))
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode))
    }

    return acc
  }, [])
}

/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */
exports.fromString = function fromString (data, version) {
  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled())

  const nodes = buildNodes(segs)
  const graph = buildGraph(nodes, version)
  const path = dijkstra.find_path(graph.map, 'start', 'end')

  const optimizedSegs = []
  for (let i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node)
  }

  return exports.fromArray(mergeSegments(optimizedSegs))
}

/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */
exports.rawSplit = function rawSplit (data) {
  return exports.fromArray(
    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
  )
}


/***/ }),

/***/ 242:
/***/ (function(__unused_webpack_module, exports) {

let toSJISFunction
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
]

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
exports.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
}

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
exports.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
}

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
exports.getBCHDigit = function (data) {
  let digit = 0

  while (data !== 0) {
    digit++
    data >>>= 1
  }

  return digit
}

exports.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f
}

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
}

exports.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
}


/***/ }),

/***/ 3114:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
}


/***/ }),

/***/ 3103:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(242)
const ECCode = __webpack_require__(5393)
const ECLevel = __webpack_require__(4908)
const Mode = __webpack_require__(6910)
const VersionCheck = __webpack_require__(3114)

// Generator polynomial used to encode version information
const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0)
const G18_BCH = Utils.getBCHDigit(G18)

function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion
    }
  }

  return undefined
}

function getReservedBitsCount (mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4
}

function getTotalBitsFromDataArray (segments, version) {
  let totalBits = 0

  segments.forEach(function (data) {
    const reservedBits = getReservedBitsCount(data.mode, version)
    totalBits += reservedBits + data.getBitsLength()
  })

  return totalBits
}

function getBestVersionForMixedData (segments, errorCorrectionLevel) {
  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
    const length = getTotalBitsFromDataArray(segments, currentVersion)
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion
    }
  }

  return undefined
}

/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */
exports.from = function from (value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10)
  }

  return defaultValue
}

/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */
exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version')
  }

  // Use Byte mode as default
  if (typeof mode === 'undefined') mode = Mode.BYTE

  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils.getSymbolTotalCodewords(version)

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel)

  // Total number of data codewords
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8

  if (mode === Mode.MIXED) return dataTotalCodewordsBits

  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version)

  // Return max number of storable codewords
  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor((usableBits / 10) * 3)

    case Mode.ALPHANUMERIC:
      return Math.floor((usableBits / 11) * 2)

    case Mode.KANJI:
      return Math.floor(usableBits / 13)

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8)
  }
}

/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */
exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
  let seg

  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M)

  if (Array.isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl)
    }

    if (data.length === 0) {
      return 1
    }

    seg = data[0]
  } else {
    seg = data
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
}

/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */
exports.getEncodedBits = function getEncodedBits (version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version')
  }

  let d = version << 12

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH))
  }

  return (version << 12) | d
}


/***/ }),

/***/ 6907:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(9653)

function clearCanvas (ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (!canvas.style) canvas.style = {}
  canvas.height = size
  canvas.width = size
  canvas.style.height = size + 'px'
  canvas.style.width = size + 'px'
}

function getCanvasElement () {
  try {
    return document.createElement('canvas')
  } catch (e) {
    throw new Error('You need to specify a canvas element')
  }
}

exports.render = function render (qrData, canvas, options) {
  let opts = options
  let canvasEl = canvas

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!canvas) {
    canvasEl = getCanvasElement()
  }

  opts = Utils.getOptions(opts)
  const size = Utils.getImageWidth(qrData.modules.size, opts)

  const ctx = canvasEl.getContext('2d')
  const image = ctx.createImageData(size, size)
  Utils.qrToImageData(image.data, qrData, opts)

  clearCanvas(ctx, canvasEl, size)
  ctx.putImageData(image, 0, 0)

  return canvasEl
}

exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
  let opts = options

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas
    canvas = undefined
  }

  if (!opts) opts = {}

  const canvasEl = exports.render(qrData, canvas, opts)

  const type = opts.type || 'image/png'
  const rendererOpts = opts.rendererOpts || {}

  return canvasEl.toDataURL(type, rendererOpts.quality)
}


/***/ }),

/***/ 3776:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

const Utils = __webpack_require__(9653)

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255
  const str = attrib + '="' + color.hex + '"'

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x
  if (typeof y !== 'undefined') str += ' ' + y

  return str
}

function qrToPath (data, size, margin) {
  let path = ''
  let moveBy = 0
  let newRow = false
  let lineLength = 0

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size)
    const row = Math.floor(i / size)

    if (!col && !newRow) newRow = true

    if (data[i]) {
      lineLength++

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0)

        moveBy = 0
        newRow = false
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength)
        lineLength = 0
      }
    } else {
      moveBy++
    }
  }

  return path
}

exports.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options)
  const size = qrData.modules.size
  const data = qrData.modules.data
  const qrcodesize = size + opts.margin * 2

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>'

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>'

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"'

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" '

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n'

  if (typeof cb === 'function') {
    cb(null, svgTag)
  }

  return svgTag
}


/***/ }),

/***/ 9653:
/***/ (function(__unused_webpack_module, exports) {

function hex2rgba (hex) {
  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string')
  }

  let hexCode = hex.slice().replace('#', '').split('')
  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex)
  }

  // Convert from short to long form (fff -> ffffff)
  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c]
    }))
  }

  // Add default alpha value
  if (hexCode.length === 6) hexCode.push('F', 'F')

  const hexValue = parseInt(hexCode.join(''), 16)

  return {
    r: (hexValue >> 24) & 255,
    g: (hexValue >> 16) & 255,
    b: (hexValue >> 8) & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  }
}

exports.getOptions = function getOptions (options) {
  if (!options) options = {}
  if (!options.color) options.color = {}

  const margin = typeof options.margin === 'undefined' ||
    options.margin === null ||
    options.margin < 0
    ? 4
    : options.margin

  const width = options.width && options.width >= 21 ? options.width : undefined
  const scale = options.scale || 4

  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  }
}

exports.getScale = function getScale (qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2
    ? opts.width / (qrSize + opts.margin * 2)
    : opts.scale
}

exports.getImageWidth = function getImageWidth (qrSize, opts) {
  const scale = exports.getScale(qrSize, opts)
  return Math.floor((qrSize + opts.margin * 2) * scale)
}

exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
  const size = qr.modules.size
  const data = qr.modules.data
  const scale = exports.getScale(size, opts)
  const symbolSize = Math.floor((size + opts.margin * 2) * scale)
  const scaledMargin = opts.margin * scale
  const palette = [opts.color.light, opts.color.dark]

  for (let i = 0; i < symbolSize; i++) {
    for (let j = 0; j < symbolSize; j++) {
      let posDst = (i * symbolSize + j) * 4
      let pxColor = opts.color.light

      if (i >= scaledMargin && j >= scaledMargin &&
        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        const iSrc = Math.floor((i - scaledMargin) / scale)
        const jSrc = Math.floor((j - scaledMargin) / scale)
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0]
      }

      imgData[posDst++] = pxColor.r
      imgData[posDst++] = pxColor.g
      imgData[posDst++] = pxColor.b
      imgData[posDst] = pxColor.a
    }
  }
}


/***/ }),

/***/ 5666:
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ 3352:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4528);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(5346)["default"])
var update = add("6bc8200a", content, true, {});

/***/ }),

/***/ 5346:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ addStylesClient; }
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 8521:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__8521__;

/***/ }),

/***/ 8976:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__8976__;

/***/ }),

/***/ 4037:
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"api":{"url":"https://devnet-api.elrond.com","timeout":2000},"proxy":{"url":"https://devnet-gateway.elrond.com","timeout":2000},"explorer":{"url":"https://devnet-explorer.elrond.com"},"maiar":{"walletConnectBridgeUrl":"https://bridge.walletconnect.org","walletConnectDeepLink":"https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/","heartbeatInterval":5000,"heartbeatEnabled":false,"connexionTimeout":30000},"webWallet":{"url":"https://devnet-wallet.elrond.com"}}');

/***/ }),

/***/ 2512:
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"api":{"url":"https://api.elrond.com","timeout":2000},"proxy":{"url":"https://gateway.elrond.com","timeout":2000},"explorer":{"url":"https://explorer.elrond.com"},"maiar":{"walletConnectBridgeUrl":"https://bridge.walletconnect.org","walletConnectDeepLink":"https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/","heartbeatInterval":5000,"heartbeatEnabled":false,"connexionTimeout":30000},"webWallet":{"url":"https://wallet.elrond.com"}}');

/***/ }),

/***/ 9280:
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"api":{"url":"https://testnet-api.elrond.com","timeout":2000},"proxy":{"url":"https://testnet-gateway.elrond.com","timeout":2000},"explorer":{"url":"https://testnet-explorer.elrond.com"},"maiar":{"walletConnectBridgeUrl":"https://bridge.walletconnect.org","walletConnectDeepLink":"https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/","heartbeatInterval":5000,"heartbeatEnabled":false,"connexionTimeout":30000},"webWallet":{"url":"https://testnet-wallet.elrond.com"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ElrondEnvEnum": function() { return /* reexport */ ElrondEnvEnum; },
  "ProviderOption": function() { return /* reexport */ ProviderOption; },
  "VueErdjsConnect": function() { return /* reexport */ VueErdjsConnect; },
  "default": function() { return /* binding */ src; },
  "providersOptions": function() { return /* reexport */ config; },
  "vueErdJsStore": function() { return /* reexport */ vueErdJsStore; }
});

// EXTERNAL MODULE: external "@elrondnetwork/erdjs"
var erdjs_ = __webpack_require__(8521);
;// CONCATENATED MODULE: ./src/providers/maiar-app/MaiarConnexionManager.ts
var MaiarConnexionManager = /** @class */ (function () {
    function MaiarConnexionManager(walletConnect, options) {
        this._walletConnect = walletConnect;
        this._heartbeatTimeout = options.heartbeatInterval;
        this._hearbeatEnabled = options.heartbeatEnabled;
        this._connexionTimeout = options.connexionTimeout;
        this._heartbeatDisconnectInterval = undefined;
        this._heartbeatInterval = undefined;
    }
    MaiarConnexionManager.prototype.startConnexionLostDetection = function () {
        var _this = this;
        if (!this._hearbeatEnabled || !this._walletConnect.walletConnector || !this._walletConnect.walletConnector.peerMeta) {
            return;
        }
        if (this._walletConnect.walletConnector.peerMeta.description.match(/(iPad|iPhone|iPod)/g)) {
            console.log("heartbeat - iPad/iPhone/iPod : no heartbeat");
            return;
        }
        this.heartbeat();
        this.newConnexionLostInterval();
        this._walletConnect.walletConnector.on("heartbeat", function () {
            console.log("Maiar App heartbeat received!");
            _this.newConnexionLostInterval();
        });
    };
    MaiarConnexionManager.prototype.heartbeat = function () {
        console.log("Heartbeat");
        if (!this.isConnected()) {
            return;
        }
        var that = this;
        if (!this._heartbeatInterval) {
            this._heartbeatInterval = setInterval(function () { that.heartbeat(); }, this._heartbeatTimeout);
        }
        this._walletConnect.sendCustomMessage({
            method: "heartbeat",
            params: {},
        })
            .then(function () {
            console.log("Maiar App heartbeat sent");
        })
            .catch(function (err) {
            console.log("Maiar App heartbeat error", err);
            that._walletConnect.logout();
            setTimeout(function () { that.heartbeat(); }, that._heartbeatInterval);
        });
    };
    MaiarConnexionManager.prototype.newConnexionLostInterval = function () {
        if (this._heartbeatDisconnectInterval) {
            clearInterval(this._heartbeatDisconnectInterval);
        }
        var that = this;
        this._heartbeatDisconnectInterval = setInterval(function () {
            console.log("Maiar App Connection Lost");
            clearInterval(that._heartbeatDisconnectInterval);
            clearInterval(that._heartbeatInterval);
            that._walletConnect.logout();
        }, this._connexionTimeout);
    };
    MaiarConnexionManager.prototype.isConnected = function () {
        return this._walletConnect &&
            "walletConnector" in this._walletConnect &&
            this._walletConnect.walletConnector &&
            this._walletConnect.walletConnector.connected;
    };
    return MaiarConnexionManager;
}());
/* harmony default export */ var maiar_app_MaiarConnexionManager = (MaiarConnexionManager);

;// CONCATENATED MODULE: ./src/providers/maiar-app/MaiarAppStrategy.ts


var MaiarAppLoginData = /** @class */ (function () {
    function MaiarAppLoginData(qrCodeData, deeplink) {
        this.deeplink = deeplink;
        this.qrCodeData = qrCodeData;
    }
    return MaiarAppLoginData;
}());
var MaiarAppStrategy = /** @class */ (function () {
    function MaiarAppStrategy(eventHandler, proxy, options) {
        var _this = this;
        this.eventHandler = eventHandler;
        this._proxy = proxy;
        this._walletConnectDeepLink = options.walletConnectDeepLink;
        this._walletConnectBridgeUrl = options.walletConnectBridgeUrl;
        this._walletConnect = new erdjs_.WalletConnectProvider(this._proxy, this._walletConnectBridgeUrl, {
            onClientLogin: function () { return _this.handleOnClientLogin(); },
            onClientLogout: function () { return _this.handleOnClientLogout(); },
        });
        if (!this._walletConnect.isInitialized()) {
            this._walletConnect.init();
        }
        this._connexionManager = new maiar_app_MaiarConnexionManager(this._walletConnect, options);
    }
    MaiarAppStrategy.prototype.id = function () {
        return "maiar-app";
    };
    MaiarAppStrategy.prototype.name = function () {
        return "Maiar App";
    };
    MaiarAppStrategy.prototype.handleOnClientLogin = function () {
        var _this = this;
        return this._walletConnect
            .getAddress()
            .then(function (address) {
            return _this._walletConnect.getSignature().then(function (signature) {
                _this.eventHandler.handleLogin(_this, new erdjs_.Address(address), signature);
                _this._connexionManager.startConnexionLostDetection();
            });
        })
            .catch(function (err) {
            _this.eventHandler.handleLoginError(_this, err);
        });
    };
    MaiarAppStrategy.prototype.handleOnClientLogout = function () {
        console.log("logout requested");
        this.eventHandler.handleLogout(this);
    };
    MaiarAppStrategy.prototype.login = function (options) {
        var _this = this;
        return this._walletConnect.login().then(function (walletConnectUri) {
            if (walletConnectUri) {
                if (options && options.token) {
                    var walletConectUriWithToken = "".concat(walletConnectUri, "&token=").concat(options.token);
                    return new MaiarAppLoginData(walletConectUriWithToken, _this.deeplink(walletConectUriWithToken));
                }
                return new MaiarAppLoginData(walletConnectUri, _this.deeplink(walletConnectUri));
            }
        });
    };
    MaiarAppStrategy.prototype.load = function () {
        if (this._connexionManager.isConnected()) {
            return this.handleOnClientLogin();
        }
        return this.handleOnClientLogout;
    };
    MaiarAppStrategy.prototype.provider = function () {
        return this._walletConnect;
    };
    MaiarAppStrategy.prototype.logout = function () {
        this._walletConnect.logout();
    };
    Object.defineProperty(MaiarAppStrategy.prototype, "walletConnectBridgeUrl", {
        get: function () {
            return this._walletConnectBridgeUrl;
        },
        enumerable: false,
        configurable: true
    });
    MaiarAppStrategy.prototype.deeplink = function (url) {
        return "".concat(this._walletConnectDeepLink, "?wallet-connect=").concat(encodeURIComponent(url));
    };
    return MaiarAppStrategy;
}());
/* harmony default export */ var maiar_app_MaiarAppStrategy = (MaiarAppStrategy);

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__(7484);
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);
;// CONCATENATED MODULE: ./src/providers/storage/StorageProvider.ts

var StorageProvider = /** @class */ (function () {
    function StorageProvider(key) {
        this._key = key;
    }
    StorageProvider.prototype.get = function () {
        var item = localStorage.getItem(this._key);
        if (!item) {
            return;
        }
        var stored = JSON.parse(item);
        if (stored.expire == 0 || dayjs_min_default()().isBefore(dayjs_min_default()(stored.expire))) {
            return stored.data;
        }
        this.clear();
        return;
    };
    StorageProvider.prototype.set = function (data, expire) {
        localStorage.setItem(this._key, JSON.stringify({
            data: data,
            expire: expire ? expire.valueOf() : 0
        }));
    };
    StorageProvider.prototype.clear = function () {
        localStorage.removeItem(this._key);
    };
    return StorageProvider;
}());
/* harmony default export */ var storage_StorageProvider = (StorageProvider);

;// CONCATENATED MODULE: ./src/providers/ledger/LedgerStrategy.ts
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var LedgerProviderManager = /** @class */ (function () {
    function LedgerProviderManager(eventHandler, proxy, options) {
        this._storage = new storage_StorageProvider('ledger-strategy');
        this._timeoutInMinutes = 30;
        this._eventHandler = eventHandler;
        this._proxy = proxy;
        this._hwProvider = new erdjs_.HWProvider(this._proxy);
    }
    LedgerProviderManager.prototype.id = function () {
        return "ledger";
    };
    LedgerProviderManager.prototype.name = function () {
        return "Ledger Wallet";
    };
    LedgerProviderManager.prototype.init = function () {
        var _this = this;
        return this._hwProvider
            .init()
            .then(function (success) {
            if (!success) {
                var error = new Error("Initialisation Error");
                _this._eventHandler.handleLoginError(_this, error);
                throw error;
            }
        });
    };
    LedgerProviderManager.prototype.accounts = function (startIndex, addressesPerPage) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init()
                            .then(function () {
                            return _this._hwProvider.getAccounts(startIndex, addressesPerPage);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LedgerProviderManager.prototype.login = function (options) {
        var _this = this;
        var addressIndex = options ? options.addressIndex ? options.addressIndex : 0 : 0;
        var token = options ? options.token ? options.token : undefined : undefined;
        return this.init()
            .then(function () {
            return token ? _this.tokenLogin(addressIndex, token) : _this.standardLogin(addressIndex);
        })
            .catch(function (error) {
            console.log(error);
            _this.logout();
        });
    };
    LedgerProviderManager.prototype.standardLogin = function (addressIndex) {
        var _this = this;
        return this._hwProvider.login({ addressIndex: addressIndex })
            .then(function (address) {
            _this._storage.set({
                wallet: address,
                addressIndex: addressIndex
            }, dayjs_min_default()().add(_this._timeoutInMinutes, 'minute'));
            _this._eventHandler.handleLogin(_this, new erdjs_.Address(address));
        })
            .catch(function (err) {
            _this._eventHandler.handleLoginError(_this, err);
        });
    };
    LedgerProviderManager.prototype.tokenLogin = function (addressIndex, token) {
        var _this = this;
        var that = this;
        return this._hwProvider.tokenLogin({ token: Buffer.from("".concat(token, "{}")) })
            .then(function (_a) {
            var address = _a.address, signature = _a.signature;
            var signedToken = signature.hex();
            _this._storage.set({
                wallet: address,
                addressIndex: addressIndex,
                token: signedToken
            }, dayjs_min_default()().add(_this._timeoutInMinutes, 'minute'));
            _this._eventHandler.handleLogin(_this, new erdjs_.Address(address), signedToken);
        })
            .catch(function (err) {
            _this._eventHandler.handleLoginError(_this, err);
        });
    };
    LedgerProviderManager.prototype.logout = function () {
        var _this = this;
        this._hwProvider.logout().then(function () {
            _this._storage.clear();
            _this._eventHandler.handleLogout(_this);
        });
    };
    LedgerProviderManager.prototype.load = function () {
        if (!window)
            return;
        console.log("Loading ledger strategy");
        var stored = this._storage.get();
        if (!stored)
            return;
        this._eventHandler.handleLogin(this, new erdjs_.Address(stored.wallet));
        this.init();
    };
    LedgerProviderManager.prototype.provider = function () {
        return this._hwProvider;
    };
    return LedgerProviderManager;
}());
/* harmony default export */ var LedgerStrategy = (LedgerProviderManager);

;// CONCATENATED MODULE: ./src/providers/web/WebWalletStrategy.ts



var WebWalletProviderStrategy = /** @class */ (function () {
    function WebWalletProviderStrategy(eventHandler, options) {
        this._storage = new storage_StorageProvider('web-wallet-strategy');
        this._timeoutInMinutes = 30;
        this._eventHandler = eventHandler;
        this._webWallet = new erdjs_.WalletProvider("".concat(options.url, "/init"));
        this._lastStatus = undefined;
    }
    WebWalletProviderStrategy.prototype.id = function () {
        return "web-wallet";
    };
    WebWalletProviderStrategy.prototype.name = function () {
        return "Web Wallet";
    };
    WebWalletProviderStrategy.prototype.provider = function () {
        return this._webWallet;
    };
    WebWalletProviderStrategy.prototype.callbackReceived = function (url) {
        var urlSearchParams = new URLSearchParams(url.toString());
        var address = urlSearchParams.get('address');
        var token = urlSearchParams.get('token');
        if (address) {
            this._storage.set({ wallet: address, token: token }, dayjs_min_default()().add(this._timeoutInMinutes, 'minute'));
            this._eventHandler.handleLogin(this, new erdjs_.Address(address));
        }
        var status = urlSearchParams.get('status');
        if (status) {
            this._lastStatus = status;
        }
        else {
            this._lastStatus = undefined;
        }
    };
    Object.defineProperty(WebWalletProviderStrategy.prototype, "lastStatus", {
        get: function () {
            return this._lastStatus;
        },
        enumerable: false,
        configurable: true
    });
    WebWalletProviderStrategy.prototype.login = function (options) {
        return this._webWallet.login(options);
    };
    WebWalletProviderStrategy.prototype.logout = function () {
        this._storage.clear();
        this._webWallet.logout();
    };
    WebWalletProviderStrategy.prototype.load = function () {
        var stored = this._storage.get();
        if (stored) {
            this._eventHandler.handleLogin(this, new erdjs_.Address(stored.wallet), stored.token);
        }
    };
    WebWalletProviderStrategy.prototype.onUrl = function (url) {
        var urlSearchParams = new URLSearchParams(url.search);
        var status = urlSearchParams.get('status');
        var txHash = urlSearchParams.get('txHash');
        if (status && txHash) {
            this._eventHandler.handleTransaction({ status: status, txHash: txHash });
        }
    };
    return WebWalletProviderStrategy;
}());
/* harmony default export */ var WebWalletStrategy = (WebWalletProviderStrategy);

;// CONCATENATED MODULE: ./src/providers/config/index.ts
var MaiarAppOption = /** @class */ (function () {
    function MaiarAppOption(options) {
        this.walletConnectBridgeUrl = "https://bridge.walletconnect.org";
        this.walletConnectDeepLink = "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/";
        this.connexionTimeout = 30000;
        this.heartbeatInterval = 5000;
        this.heartbeatEnabled = false;
        options && Object.assign(this, options);
    }
    return MaiarAppOption;
}());
var LedgerOption = /** @class */ (function () {
    function LedgerOption(options) {
        this.useFirstIndex = false;
        options && Object.assign(this, options);
    }
    return LedgerOption;
}());
//dev to mainnet
var WebWalletOption = /** @class */ (function () {
    function WebWalletOption(options) {
        this.url = "https://devnet-wallet.elrond.com";
        options && Object.assign(this, options);
    }
    return WebWalletOption;
}());
var DefiWalletOption = /** @class */ (function () {
    function DefiWalletOption(options) {
        options && Object.assign(this, options);
    }
    return DefiWalletOption;
}());
//dev to mainnet
var ApiOption = /** @class */ (function () {
    function ApiOption(options) {
        this.url = "https://devnet-api.elrond.com";
        this.timeout = 2000;
        options && Object.assign(this, options);
    }
    return ApiOption;
}());
//dev to mainnet
var ProxyOption = /** @class */ (function () {
    function ProxyOption(options) {
        this.url = "https://devnet-gateway.elrond.com";
        this.timeout = 2000;
        options && Object.assign(this, options);
    }
    return ProxyOption;
}());
//dev to mainnet
var ExplorerOption = /** @class */ (function () {
    function ExplorerOption(options) {
        this.url = "https://devnet-explorer.elrond.com";
        options && Object.assign(this, options);
    }
    return ExplorerOption;
}());
var ProviderOption = /** @class */ (function () {
    function ProviderOption(options) {
        this.maiar = new MaiarAppOption();
        this.ledger = new LedgerOption();
        this.webWallet = new WebWalletOption();
        this.defiWallet = new DefiWalletOption();
        this.api = new ApiOption();
        this.proxy = new ProxyOption();
        this.explorer = new ExplorerOption();
        options && Object.assign(this, options);
    }
    return ProviderOption;
}());
var ElrondEnvEnum;
(function (ElrondEnvEnum) {
    ElrondEnvEnum[ElrondEnvEnum["DEVNET"] = 0] = "DEVNET";
    ElrondEnvEnum[ElrondEnvEnum["TESTNET"] = 1] = "TESTNET";
    ElrondEnvEnum[ElrondEnvEnum["MAINNET"] = 2] = "MAINNET";
})(ElrondEnvEnum || (ElrondEnvEnum = {}));
var devnet = __webpack_require__(4037);
var testnet = __webpack_require__(9280);
var mainnet = __webpack_require__(2512);

/* harmony default export */ var config = (function (env) {
    switch (env) {
        case ElrondEnvEnum.MAINNET:
            return new ProviderOption(mainnet);
        case ElrondEnvEnum.TESTNET:
            return new ProviderOption(testnet);
        case ElrondEnvEnum.DEVNET:
        default:
            return new ProviderOption(devnet);
    }
});

;// CONCATENATED MODULE: ./src/providers/defi/DefiWalletStrategy.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var DefiWalletProviderStrategy = /** @class */ (function () {
    function DefiWalletProviderStrategy(eventHandler, options) {
        this._storage = new storage_StorageProvider("defi-wallet-strategy");
        this._timeoutInMinutes = 30;
        this._eventHandler = eventHandler;
        this._defiWallet = erdjs_.ExtensionProvider.getInstance();
        this._lastStatus = undefined;
    }
    DefiWalletProviderStrategy.prototype.id = function () {
        return "defi-wallet";
    };
    DefiWalletProviderStrategy.prototype.name = function () {
        return "Defi Wallet";
    };
    DefiWalletProviderStrategy.prototype.provider = function () {
        return this._defiWallet;
    };
    DefiWalletProviderStrategy.prototype.load = function () {
        var _this = this;
        var stored = this._storage.get();
        if (!stored) {
            return;
        }
        this._defiWallet.setAddress(stored.wallet);
        this._defiWallet.init().then(function (success) {
            if (success) {
                _this._eventHandler.handleLogin(_this, new erdjs_.Address(stored.wallet), stored.token);
            }
            else {
                console.log("Login failed", success);
            }
        });
    };
    Object.defineProperty(DefiWalletProviderStrategy.prototype, "lastStatus", {
        get: function () {
            return this._lastStatus;
        },
        enumerable: false,
        configurable: true
    });
    DefiWalletProviderStrategy.prototype.login = function (options) {
        var _this = this;
        this._eventHandler.handleLoginStart(this);
        if (!this._defiWallet.isInitialized()) {
            this._defiWallet.init();
        }
        return this._defiWallet.login(options).then(function () {
            var _a = _this._defiWallet.account, signature = _a.signature, address = _a.address;
            var token = signature ? { token: signature } : {};
            _this._storage.set(__assign({ wallet: address }, token), dayjs_min_default()().add(_this._timeoutInMinutes, 'minute'));
            _this._eventHandler.handleLogin(_this, new erdjs_.Address(address), signature);
        }).catch(function (error) {
            _this._eventHandler.handleLoginError(_this, error);
        });
    };
    DefiWalletProviderStrategy.prototype.logout = function () {
        this._defiWallet.logout();
    };
    return DefiWalletProviderStrategy;
}());
/* harmony default export */ var DefiWalletStrategy = (DefiWalletProviderStrategy);

// EXTERNAL MODULE: ./node_modules/@elrondnetwork/erdjs/out/transactionWatcher.js
var transactionWatcher = __webpack_require__(5954);
;// CONCATENATED MODULE: ./src/providers/TransactionResult.ts
var TransactionResult_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TransactionResult_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var TransactionResult = /** @class */ (function () {
    function TransactionResult(hash, proxy, api, delay) {
        if (delay === void 0) { delay = 0; }
        this._hash = hash;
        this._proxy = proxy;
        this._api = api;
        this._delay = delay;
    }
    TransactionResult.prototype.watch = function () {
        return TransactionResult_awaiter(this, void 0, void 0, function () {
            var watcher;
            var _this = this;
            return TransactionResult_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        watcher = new transactionWatcher.TransactionWatcher(this._hash, this._proxy);
                        return [4 /*yield*/, watcher.awaitStatus(function (status) { return status.isSuccessful() || status.isFailed(); }, function () { })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, _this._delay); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this._api.getTransaction(this._hash).then(function (transaction) {
                                if (!transaction) {
                                    throw new Error("Cannot fetch transaction Information");
                                }
                                return transaction;
                            })];
                }
            });
        });
    };
    return TransactionResult;
}());
/* harmony default export */ var providers_TransactionResult = (TransactionResult);

;// CONCATENATED MODULE: ./src/providers/Providers.ts
var Providers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Providers_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var PROVIDER_STRATEGY_STORAGE = "vue-erdjs-strategy";
var Providers = /** @class */ (function () {
    function Providers(proxy, api, options, onLogin, onLogout, onTransaction) {
        this.currentStrategy = undefined;
        this._proxy = proxy;
        this._api = api;
        this.onLogin = onLogin;
        this.onLogout = onLogout;
        this.onTransaction = onTransaction;
        this._maiarApp = new maiar_app_MaiarAppStrategy(this, proxy, options.maiar);
        this._ledger = new LedgerStrategy(this, proxy, options.ledger);
        this._webWallet = new WebWalletStrategy(this, options.webWallet);
        this._defiWallet = new DefiWalletStrategy(this, options.defiWallet);
        this.initialised = false;
    }
    Providers.prototype.init = function () {
        return Providers_awaiter(this, void 0, void 0, function () {
            var strategyStorage, strategy, storedStrategy;
            return Providers_generator(this, function (_a) {
                if (!window || this.initialised)
                    return [2 /*return*/];
                console.log("Providers init!");
                this.initialised = true;
                strategyStorage = window.localStorage.getItem(PROVIDER_STRATEGY_STORAGE);
                if (!strategyStorage)
                    return [2 /*return*/];
                strategy = JSON.parse(strategyStorage);
                console.log("Strategy stored", strategy);
                if (strategy.name === this.maiarApp.id()) {
                    storedStrategy = this.maiarApp;
                }
                else if (strategy.name === this.ledger.id()) {
                    storedStrategy = this.ledger;
                }
                else if (strategy.name === this.webWallet.id()) {
                    storedStrategy = this.webWallet;
                }
                else if (strategy.name === this.defiWallet.id()) {
                    storedStrategy = this.defiWallet;
                }
                if (storedStrategy) {
                    storedStrategy.load();
                }
                return [2 /*return*/];
            });
        });
    };
    Providers.prototype.onUrl = function (url) {
        if (this.currentStrategy && this.currentStrategy.onUrl) {
            this.currentStrategy.onUrl(url);
        }
    };
    Object.defineProperty(Providers.prototype, "currentProvider", {
        get: function () {
            var _a;
            return (_a = this.currentStrategy) === null || _a === void 0 ? void 0 : _a.provider();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "currentProviderName", {
        get: function () {
            var _a;
            return (_a = this.currentStrategy) === null || _a === void 0 ? void 0 : _a.name();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "ledger", {
        get: function () {
            return this._ledger;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "maiarApp", {
        get: function () {
            return this._maiarApp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "webWallet", {
        get: function () {
            return this._webWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "defiWallet", {
        get: function () {
            return this._defiWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "proxy", {
        get: function () {
            return this._proxy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Providers.prototype, "api", {
        get: function () {
            return this._api;
        },
        enumerable: false,
        configurable: true
    });
    Providers.prototype.logout = function () {
        if (this.currentStrategy) {
            this.currentStrategy.logout();
            this.handleLogout(this.currentStrategy);
        }
    };
    Providers.prototype.sendAndWatch = function (transaction) {
        var _this = this;
        if (!this.currentProvider) {
            throw new Error("No available provider");
        }
        return this.signAndSend(transaction).then(function (result) { return _this.transactionResult(result); });
    };
    Providers.prototype.signAndSend = function (transaction) {
        return Providers_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return Providers_generator(this, function (_a) {
                if (!this.currentProvider) {
                    throw new Error("No available provider");
                }
                if (this.currentStrategy instanceof WebWalletStrategy) {
                    return [2 /*return*/, this.currentProvider.sendTransaction(transaction)];
                }
                return [2 /*return*/, this.currentProvider.signTransaction(transaction).then(function (transaction) {
                        return transaction.send(_this._proxy).then(function () { return transaction; });
                    })];
            });
        });
    };
    Providers.prototype.transactionResult = function (transaction, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        return new providers_TransactionResult(transaction.getHash(), this._proxy, this._api, delay).watch().then(function (transaction) {
            _this.onTransaction(transaction);
            return transaction;
        });
    };
    Providers.prototype.handleLoginStart = function (provider) {
        console.log("Login start", provider);
    };
    Providers.prototype.handleLogin = function (provider, address, token) {
        console.log("Login", provider, address, token);
        window.localStorage.setItem(PROVIDER_STRATEGY_STORAGE, JSON.stringify({ name: provider.id() }));
        this.currentStrategy = provider;
        this.onLogin(address, token);
    };
    Providers.prototype.handleLoginError = function (provider, err) {
        console.log("Login error", provider, err);
        this.handleLogout(provider);
    };
    Providers.prototype.handleLogout = function (provider) {
        console.log("Logout", provider);
        window.localStorage.removeItem(PROVIDER_STRATEGY_STORAGE);
        this.currentStrategy = undefined;
        this.onLogout();
    };
    Providers.prototype.handleTransaction = function (transaction) {
        var _this = this;
        new providers_TransactionResult(new erdjs_.TransactionHash(transaction.txHash), this._proxy, this._api)
            .watch()
            .then(function (transaction) {
            _this.onTransaction(transaction);
        });
    };
    return Providers;
}());

/* harmony default export */ var providers_Providers = (Providers);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_ = __webpack_require__(8976);
var external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_);
;// CONCATENATED MODULE: ./src/VueErdJsStore.ts

var VueErdJsStore = /** @class */ (function () {
    function VueErdJsStore() {
        this.state = new (external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default())({
            data: {
                walletAddress: null,
                token: null
            }
        });
    }
    Object.defineProperty(VueErdJsStore.prototype, "logged", {
        get: function () {
            return this.walletAddress != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJsStore.prototype, "walletAddress", {
        get: function () {
            return this.state.$data.walletAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJsStore.prototype, "token", {
        get: function () {
            return this.state.$data.token;
        },
        enumerable: false,
        configurable: true
    });
    VueErdJsStore.prototype.$emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.state.$emit(event, args);
    };
    VueErdJsStore.prototype.$on = function (event, callback) {
        return this.state.$on(event, callback);
    };
    VueErdJsStore.prototype.$once = function (event, callback) {
        return this.state.$once(event, callback);
    };
    VueErdJsStore.prototype.$off = function (event, callback) {
        return this.state.$off(event, callback);
    };
    return VueErdJsStore;
}());
/* harmony default export */ var src_VueErdJsStore = (VueErdJsStore);

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VueErdjsConnect.vue?vue&type=template&id=5fc23309&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue3rdj5"},[(_vm.$erd.walletAddress)?_c('div',{staticClass:"vue3rdj5__logged"},[_c('div',{staticClass:"vue3rdj5__logged-address"},[_vm._v(_vm._s(_vm.$erd.obfuscatedWalletAddress))]),_vm._v(" "),_c('button',{staticClass:"vue3rdj5__logged-logout",on:{"click":function($event){$event.preventDefault();return _vm.$erd.logout()}}},[_vm._v("Logout")]),_vm._v(" "),_c('div',{staticClass:"mint-section"},[_c('mint')],1)]):_vm._e(),_vm._v(" "),(!_vm.$erd.walletAddress)?_c('div',{staticClass:"vue3rdj5__modes"},[_c('vue-erdjs-tab',{attrs:{"name":"Defi Wallet","selected-mode":_vm.selectedMode},on:{"select-mode":function($event){_vm.selectedMode = $event}}}),_vm._v(" "),_c('defi-wallet-login',{attrs:{"selected-mode":_vm.selectedMode,"token":_vm.token}}),_vm._v(" "),_c('vue-erdjs-tab',{attrs:{"name":"Maiar","selected-mode":_vm.selectedMode},on:{"select-mode":function($event){_vm.selectedMode = $event}}}),_vm._v(" "),_c('maiar-login',{attrs:{"selected-mode":_vm.selectedMode,"qrcodeHandler":_vm.qrcodeHandler,"token":_vm.token}}),_vm._v(" "),_c('vue-erdjs-tab',{attrs:{"name":"Ledger","selected-mode":_vm.selectedMode},on:{"select-mode":function($event){_vm.selectedMode = $event}}}),_vm._v(" "),_c('ledger-login',{attrs:{"selected-mode":_vm.selectedMode,"token":_vm.token}}),_vm._v(" "),_c('web-wallet-login',{attrs:{"selected-mode":_vm.selectedMode,"token":_vm.token},on:{"select-mode":function($event){_vm.selectedMode = $event}}})],1):_vm._e()])}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VueErdjsTab.vue?vue&type=template&id=cf54872a&
var VueErdjsTabvue_type_template_id_cf54872a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"vue3rdj5__modes-open",class:[ _vm.selectedMode === _vm.name ? 'vue3rdj5__modes-open-active' : '' ],attrs:{"type":"button"},on:{"click":function($event){return _vm.selectMode()}}},[_c('img',{staticClass:"vue3rdj5__modes-logo",class:[ 'vue3rdj5__modes-logo-' + _vm.nameToClass ],attrs:{"src":_vm.logos[_vm.name],"alt":_vm.name + ' Logo'}}),_vm._v("\n    "+_vm._s(_vm.name)+"\n")])}
var VueErdjsTabvue_type_template_id_cf54872a_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.string.replace-all.js
var esnext_string_replace_all = __webpack_require__(7207);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VueErdjsTab.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var VueErdjsTabvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      logos: {
        'Defi Wallet': 'data:image/png;base64,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dHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6NTYzZjQ3MjUtOTRmZS00OWRjLTk5MjQtMmY1MTczMzI3MzQzIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM0MDhmMmY1LWYxMjgtNDUyMi1hMDRhLWNlZDZiYmM1YWFlOSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQ4MjQ3NmRhLWEyZjctNDhhNS05NWFjLWY1MDk5OWUyYjUyZCIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09Ik1hYyBPUyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NDE2MzE4MDc2MzI0ODEiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMzRhMTIwMC1iNTYwLTQzM2YtYjZjYy1iYjFmOGQ2MjRkOGYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTWFjIE9TKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMi0wMS0wOFQwOTo1MDowNyswMTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5UhL/cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gEICDIHiRrDCgAAGaxJREFUeNrtnXucXFWV779rVyfdSVflSXgqb013VYOD+BqvIzOjoxdRGZhERXl4AUWFAe4wo6CAAQUJCUSe8hCc4aEoKjODAoPwQUTAy8MrkqokIOgd5B3yOqfz7N7r/rFPSJNUdVedfqT61Pp+qE/4dNepPmfX/u291t5rrwWGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRhNjwz4/0nAicCngSLQbs1jZIgNQBm4GbgSWD9QAHsAdwLd1k5GC1AGDgaek2Tkf9w6v9GCIjgwB5yamD2G0UrsCKwQ4LfAAdYeRgvyuCTOgDm8RiuyTgCt8Uux9jEyRNV+7qxdjFbGBGCYAAzDBGAYJgDDaC3arAlGnrzrzgluBrCjonsLcgBICdgXmAU6LWn7PpA1wCvAM6AVRR8T5I/Aq56+5b1+Wb+16OiR2WXQgiu1Kews8DaFnQT6gGeBJxW/JvZLdCT+TqebLY7cZEX2FuS9wDuB/YBdgenA5BRt2QusBF4EngQeUfxDgjyj6LrYV3QE26ld0R0F9xagA3Q58DSwJvLlLIlPW0YAedfdKbhzQeaEEZeJyXOuA/4IXAp6Q+TLm4b3d4pvFtxRhMCqElAYpVm1H1gDVICfgb8h8pUXRqDzvwPkK8D7gc7EJN4EvAzcrPSdF/ulfSaA8TXyF0FuSUbhWmwAFoIuinz5tQY/fzrI/qCHghyfdPqxZi3otSC3gT4Z+fKKBp9hEsjHgcuBHQbpM08A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',
        'Ledger': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy4wIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRTI2MERCNzQwNkMxMUVDOTgyNEM0MTkzNTkwMTc2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRTI2MERCODQwNkMxMUVDOTgyNEM0MTkzNTkwMTc2QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVFMjYwREI1NDA2QzExRUM5ODI0QzQxOTM1OTAxNzZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVFMjYwREI2NDA2QzExRUM5ODI0QzQxOTM1OTAxNzZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hU6k9QAABbZJREFUeNrs3M1rXFUYwOE5zbTpRxzEtCCGuilduXfnUsS6difd1bX4F7j2T5CC4LYb1+LGgtitoCIIgkI/oEZKP2IzTXJ8bz2zEMrcZu6dzJzJ88BrSiGX5L3j785tyE055wFADU5YASBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAR2/Y/CeldLf5ELNTPrL8mofxny7n8OOYr61kqpMxX8W8G/O47I96XuujmO+H5S9et5OqvWYFL3VxfiNmswz12XJLuBrGVtBq356q90ywgGoIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFv3zhA0Ei2qsW8FLRX1kDXUb9nScb2J+jdkYeM7QIi44P1lFq+ZpDTdifil/5mh33zwp4/2YS52OlPPzvuSO855zArT4smNnfujrltCtJTDNmWUKzZrzAUyR+uiNd0ZANQQLECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsADBsgJAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIQLECwAAQLQLAAwZrIVgnMuxN9BeuUcwG0tGa94zHWhuUPf5YDPo1Jh6jlsHwRj5yPhbocczFmPMNVrDmHT2J+jHlmlczJfsxfMQ9itg/5uQcxmzG3U855kFK60OEt24nyRYydk4W5HvPhjOevuUD9HvNBzB2rZE6a19lGzLmYvRluJZsL6+7kHdZ9+6za2ZhRh88flasYzEsud2Kd7sb8lHB13m53/Xw/OGHpCRYgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAYJlBYBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIFCBaAYAEIFiBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQgWIFgAggUgWIBgAQgWgGABggUgWACCBQgWgGABCBYgWACCBQgWgGABCBYgWACCBSBY9OnAChAsavHEClh2QysgbMXciNmJWV+x7y2X76mZz2K+c7oFi7qdjblyDL7PS4LllhBqsWcFggUgWACCBQgWgGABCBYgWACCBQgWgGABCBb/t2YFXu/HweSXny+Uj3nGF8GDmLF1LkzzlIWHM56/4yIN/C7hove/EXNuhvOQS6t2U855kFL6o4TnaTnwYQ7SPLbjasy3zsnCXI65WC4aovXid6DN6/vnmPvWsRBnYj6P+Shm+5Cf2zxccjPm5uQd1psdv5hXnI+F+q0MLPNF43zMq2VmsdXXPb3bQaDtXdJux2Ps9xWs5HwA8+6En5oA1RAsQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBAtAsAAECxAsAMECECxAsAAEC0CwAMECECwAwQIEC0CwAAQLECwAwQIEywoAwQIQLECwAAQLQLAAwQIQLADBAgQLQLAABAsQLADBAhAsQLAABAtAsADBAhAsAMECBGti3yqBKXLMwbIE68D5AKb4p4+DDHv6Yj6NuRKzUUrK0b5D/iLmlnW0vtY/iXnLHcGRa/Y9jnmn64FSznmQUhKZul2LuW4NU63H3Ix52yqqdcs/uq+GXSto1VyUH1rDatxSUP//jCBYAIIFIFiAYAEIFoBgAYIFIFgAggUIFoBgAQjW6jplBa3W7Kl6JyfPw7oXk2J2ykeWX/MLz6cH/z3n6W/raLUXcydmO+bxwC+M1/ZaH8Xcfv48LAC3hACCBQgWgGABCBYgWACCBSBYgGABCBaAYAGCBSBYAIIFCBaAYAEIFiBYAIIF8EL/CjAAlUuwcFQMH5EAAAAASUVORK5CYII=',
        'Maiar': 'data:image/png;base64,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',
        'Web Wallet': 'data:image/png;base64,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dHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6NTYzZjQ3MjUtOTRmZS00OWRjLTk5MjQtMmY1MTczMzI3MzQzIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmM0MDhmMmY1LWYxMjgtNDUyMi1hMDRhLWNlZDZiYmM1YWFlOSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQ4MjQ3NmRhLWEyZjctNDhhNS05NWFjLWY1MDk5OWUyYjUyZCIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09Ik1hYyBPUyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NDE2MzE4MDc2MzI0ODEiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMzRhMTIwMC1iNTYwLTQzM2YtYjZjYy1iYjFmOGQ2MjRkOGYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTWFjIE9TKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMi0wMS0wOFQwOTo1MDowNyswMTowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5UhL/cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gEICDIHiRrDCgAAGaxJREFUeNrtnXucXFWV779rVyfdSVflSXgqb013VYOD+BqvIzOjoxdRGZhERXl4AUWFAe4wo6CAAQUJCUSe8hCc4aEoKjODAoPwQUTAy8MrkqokIOgd5B3yOqfz7N7r/rFPSJNUdVedfqT61Pp+qE/4dNepPmfX/u291t5rrwWGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRhNjwz4/0nAicCngSLQbs1jZIgNQBm4GbgSWD9QAHsAdwLd1k5GC1AGDgaek2Tkf9w6v9GCIjgwB5yamD2G0UrsCKwQ4LfAAdYeRgvyuCTOgDm8RiuyTgCt8Uux9jEyRNV+7qxdjFbGBGCYAAzDBGAYJgDDaC3arAlGnrzrzgluBrCjonsLcgBICdgXmAU6LWn7PpA1wCvAM6AVRR8T5I/Aq56+5b1+Wb+16OiR2WXQgiu1Kews8DaFnQT6gGeBJxW/JvZLdCT+TqebLY7cZEX2FuS9wDuB/YBdgenA5BRt2QusBF4EngQeUfxDgjyj6LrYV3QE26ld0R0F9xagA3Q58DSwJvLlLIlPW0YAedfdKbhzQeaEEZeJyXOuA/4IXAp6Q+TLm4b3d4pvFtxRhMCqElAYpVm1H1gDVICfgb8h8pUXRqDzvwPkK8D7gc7EJN4EvAzcrPSdF/ulfSaA8TXyF0FuSUbhWmwAFoIuinz5tQY/fzrI/qCHghyfdPqxZi3otSC3gT4Z+fKKBp9hEsjHgcuBHQbpM08A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'
      }
    };
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    selectedMode: {
      type: String,
      default: ''
    }
  },
  computed: {
    nameToClass: function nameToClass() {
      return this.name.toLowerCase().replaceAll(' ', '-');
    }
  },
  methods: {
    selectMode: function selectMode() {
      if (this.selectedMode === this.name) {
        this.$emit('select-mode', '');
      } else {
        this.$emit('select-mode', this.name);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VueErdjsTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VueErdjsTabvue_type_script_lang_js_ = (VueErdjsTabvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/VueErdjsTab.vue





/* normalize component */
;
var component = normalizeComponent(
  components_VueErdjsTabvue_type_script_lang_js_,
  VueErdjsTabvue_type_template_id_cf54872a_render,
  VueErdjsTabvue_type_template_id_cf54872a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueErdjsTab = (component.exports);
;// CONCATENATED MODULE: ./src/components/maiar/QRCodeDefaultHandler.ts
var QRCodeDefaultHandler_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var QRCodeDefaultHandler_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var QRCodeDefaultHandler = /** @class */ (function () {
    function QRCodeDefaultHandler() {
    }
    QRCodeDefaultHandler.prototype.handle = function (data, element) {
        return QRCodeDefaultHandler_awaiter(this, void 0, void 0, function () {
            var QRCode;
            return QRCodeDefaultHandler_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        QRCode = __webpack_require__(2592);
                        return [4 /*yield*/, QRCode.toString(data, {
                                type: "svg",
                            }).then(function (svg) {
                                return svg;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return QRCodeDefaultHandler;
}());
/* harmony default export */ var maiar_QRCodeDefaultHandler = (QRCodeDefaultHandler);

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./bonaApp/mint/Mint.vue?vue&type=template&id=605550b4&
var Mintvue_type_template_id_605550b4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',[_vm._v("Mint the private Sale "+_vm._s(_vm.sendEgldPrice))]),_vm._v(" "),_c('div',{staticClass:"mint__error"},[_vm._v(_vm._s(_vm.error ? _vm.error : ' '))]),_vm._v(" "),_c('div',{staticClass:"mint"},[_c('button',{on:{"click":function($event){$event.preventDefault();return _vm.sendF()}}},[_vm._v("Mint!")])])])}
var Mintvue_type_template_id_605550b4_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(7757);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__(6977);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(2222);
;// CONCATENATED MODULE: ./bonaApp/mint/MintSC.ts
/* provided dependency */ var process = __webpack_require__(4155);
/* provided dependency */ var MintSC_Buffer = __webpack_require__(8764)["Buffer"];
var MintSC_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MintSC_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var Codec = new erdjs_.BinaryCodec();
var gasLimite = 280000000;
var ScAddress = process.env.ScAddress;
var sca = "erd1qqqqqqqqqqqqqpgqy0tefkrf8zpz2mveldvrthutxyh9shl3de8s9q7826";
var MintSC = /** @class */ (function () {
    function MintSC(provider) {
        this.smartContractAddress = sca;
        this._provider = provider;
    }
    MintSC.prototype.sendF = function (wallet, amount) {
        return MintSC_awaiter(this, void 0, void 0, function () {
            var account, payload, transaction;
            return MintSC_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account = new erdjs_.Account(wallet);
                        return [4 /*yield*/, account.sync(this._provider.proxy)];
                    case 1:
                        _a.sent();
                        payload = erdjs_.TransactionPayload.contractCall()
                            .setFunction(new erdjs_.ContractFunction("mint@01"))
                            .setArgs([])
                            .build();
                        transaction = new erdjs_.Transaction({
                            sender: wallet,
                            receiver: new erdjs_.Address(this.smartContractAddress),
                            gasLimit: new erdjs_.GasLimit(gasLimite),
                            value: erdjs_.Balance.egld(amount),
                            data: payload,
                        });
                        transaction.setNonce(account.nonce);
                        return [2 /*return*/, this._provider.sendAndWatch(transaction)];
                }
            });
        });
    };
    MintSC.prototype.didUserSend = function (wallet) {
        return MintSC_awaiter(this, void 0, void 0, function () {
            var contract, result, decoded;
            return MintSC_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = new erdjs_.SmartContract({ address: new erdjs_.Address(this.smartContractAddress) });
                        return [4 /*yield*/, contract.runQuery(this._provider.proxy, {
                                func: new erdjs_.ContractFunction("didUserSend"),
                                args: [new erdjs_.AddressValue(wallet)]
                            })];
                    case 1:
                        result = _a.sent();
                        decoded = Codec.decodeTopLevel(new MintSC_Buffer(result.outputUntyped()[0]), new erdjs_.BooleanType());
                        console.log("didUserSend", decoded.valueOf());
                        return [2 /*return*/, decoded.valueOf()];
                }
            });
        });
    };
    MintSC.prototype.dateToReceived = function (wallet) {
        return MintSC_awaiter(this, void 0, void 0, function () {
            var contract, result;
            return MintSC_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = new erdjs_.SmartContract({ address: new erdjs_.Address(this.smartContractAddress) });
                        return [4 /*yield*/, contract.runQuery(this._provider.proxy, {
                                func: new erdjs_.ContractFunction("getTimeToReceived"),
                                args: [new erdjs_.AddressValue(wallet)]
                            })];
                    case 1:
                        result = _a.sent();
                        console.log("dateReceived", result.returnData);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    MintSC.prototype.sendAmount = function () {
        return MintSC_awaiter(this, void 0, void 0, function () {
            var contract, result, decoded;
            return MintSC_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract = new erdjs_.SmartContract({ address: new erdjs_.Address(this.smartContractAddress) });
                        return [4 /*yield*/, contract.runQuery(this._provider.proxy, {
                                func: new erdjs_.ContractFunction("getSendAmount"),
                                args: []
                            })];
                    case 1:
                        result = _a.sent();
                        decoded = Codec.decodeTopLevel(new MintSC_Buffer(result.outputUntyped()[0]), new erdjs_.BigUIntType());
                        console.log("getSendAmount", decoded.valueOf());
                        return [2 /*return*/, decoded.valueOf()];
                }
            });
        });
    };
    return MintSC;
}());
/* harmony default export */ var mint_MintSC = (MintSC);

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./bonaApp/mint/Mint.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Mintvue_type_script_lang_js_ = ({
  name: 'Mint',
  data: function data() {
    return {
      qrcode: null,
      deepLink: null,
      error: null,
      mint: null,
      mintAmount: 0.5,
      hasSend: false
    };
  },
  created: function created() {
    var _this = this;

    this.$erd.$on('transaction', function (transaction) {
      console.log("transaction", transaction);
      var trans = transaction[0];

      if (!trans.status.isSuccessful()) {
        _this.error = "Transaction failed : ".concat(trans.getSmartContractResults().getImmediate().getReturnMessage());
      }
    });
  },
  mounted: function mounted() {
    var _this2 = this;

    this.mint = new mint_MintSC(this.$erd.providers, this.$erdProxy);
    this.mint.mintAmount().then(function (amount) {
      _this2.mintAmount = amount;
    });
    this.mint.didUserSend(this.$erd.walletAddress).then(function (hasSend) {
      _this2.hasSend = hasSend;
    });
  },
  computed: {
    sendEgldPrice: function sendEgldPrice() {
      if (this.mintAmount) {
        var amount = erdjs_.Balance.egld(this.mintAmount.valueOf());
        var denominated = amount.valueOf().shiftedBy(-amount.token.decimals).toFixed(2);
        return "".concat(denominated, " ").concat(amount.token.getTokenIdentifier());
      }

      return '- EGLD';
    }
  },
  methods: {
    sendF: function sendF() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.mint.dateToReceived(_this3.$erd.walletAddress);

                _context.prev = 1;
                _context.next = 4;
                return _this3.mint.sendF(_this3.$erd.walletAddress, _this3.mintAmount);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                console("fail");

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 6]]);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./bonaApp/mint/Mint.vue?vue&type=script&lang=js&
 /* harmony default export */ var mint_Mintvue_type_script_lang_js_ = (Mintvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./bonaApp/mint/Mint.vue





/* normalize component */
;
var Mint_component = normalizeComponent(
  mint_Mintvue_type_script_lang_js_,
  Mintvue_type_template_id_605550b4_render,
  Mintvue_type_template_id_605550b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Mint = (Mint_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VueErdjsConnect.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var VueErdjsConnectvue_type_script_lang_js_ = ({
  components: {
    VueErdjsTab: VueErdjsTab,
    Mint: Mint
  },
  name: "VueErdjsConnect",
  props: {
    qrcodeHandler: {
      require: true,
      default: function _default() {
        return new maiar_QRCodeDefaultHandler();
      }
    },
    token: {
      require: false,
      type: String
    }
  },
  data: function data() {
    return {
      selectedMode: ''
    };
  },
  mounted: function mounted() {
    this.redirect();
  },
  methods: {
    redirect: function redirect() {
      if (this.$router && this.$erd.walletAddress && this.$route.query.fromUrl) {
        this.$router.push(this.$route.query.fromUrl);
      }
    }
  },
  watch: {
    "$erd.walletAddress": function $erdWalletAddress(address) {
      if (address != null) {
        this.redirect();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/VueErdjsConnect.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VueErdjsConnectvue_type_script_lang_js_ = (VueErdjsConnectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/VueErdjsConnect.vue?vue&type=style&index=0&lang=scss&
var VueErdjsConnectvue_type_style_index_0_lang_scss_ = __webpack_require__(3352);
;// CONCATENATED MODULE: ./src/components/VueErdjsConnect.vue?vue&type=style&index=0&lang=scss&

;// CONCATENATED MODULE: ./src/components/VueErdjsConnect.vue



;


/* normalize component */

var VueErdjsConnect_component = normalizeComponent(
  components_VueErdjsConnectvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueErdjsConnect = (VueErdjsConnect_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/maiar/MaiarLogin.vue?vue&type=template&id=3feafd8f&
var MaiarLoginvue_type_template_id_3feafd8f_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.openContent)?_c('div',{staticClass:"vue3rdj5__mode"},[_c('div',{ref:"qrcode",staticClass:"vue3rdj5__mode-qr"}),_vm._v(" "),(_vm.qrcode)?_c('div',{staticClass:"vue3rdj5__mode-qr",domProps:{"innerHTML":_vm._s(_vm.qrcode)}}):_vm._e(),_vm._v(" "),(_vm.deeplink && _vm.isMobile())?_c('a',{staticClass:"vue3rdj5__mode-link vue3rdj5__mode-link-maiar",attrs:{"href":_vm.deeplink}},[_c('img',{staticClass:"vue3rdj5__modes-logo vue3rdj5__modes-logo-maiar",attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAT0ElEQVR4Xu2de3AV133HFxs9772AMRgwOICRnQ42BiwbF2yMEDZ+1WniTv7MdDpN0/yD+5i4ScjYOOm06XgC9oCx66bpxAaHlDj1pEnqtOnEeRiMZKdGoBdIvISu3hYIEHri0/M9e1csex+6j73as3e/v5lPRAxc9pz9fnbPY1cyDBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLNVmJacbn919vVL07vbLywyISXJABlQVkorBLNnCisSxWgopdFAtMhljwHRWqqp1fvLH2jhsePLiCBBdkAFlw5qMwRNgmrlPEaubmmupwdc2uSHXtgXB17Rn59bJkVDJCAgnO/VAsCweQDWQkWX78VbahTunm2gdDG2vflY0UCdlUQ4KKMwsSZAWZSZQlf5TtgGdU1zzvaOC4bPh4+aZDhCALV2y/HrdnZcaGg99MlCm9y3bLig13rAaNRDbWfBLZeEgQkhyZEXN4pP5/2cZf7ZZRMucC+g+H5KTFPMhptis/GjQe31BCkqPuCMhO1XsidP87/4hMmdnSeWJsrvZMK33od1XXDHkSNJCQyYhJIEIP/lKU37P3MWQr0YqiJjVh5nWh6ppfXx32xDeMkLRBhqp+I8rX/cf7MltFhhoO6XgXiF39Z2769cMTV3+O+UnOyAxtqhGhB34mImte/RwyZlS+BhE0q6ptEOD6GdUHXuHQh7iKzBKGQWX3fn8PMhbLmk6lbkmY/BZFqg8eUgJgScvZEEKyQQoQ3vhbEVqz97DMWLmZtW0arQjFrv6lq/91cWTTobMQQE1gnA0hJBvU/sBBEVq7r6O4YstyZM2o/JJGw6Dl24rl/xYV3b/vHnmwwxSAuElsk0yE1709XHrHcxuRNaNiS4kzhp5VRcVOHExxZM331kbM5ztg7RVnQwjJCmQJF9W1b4/NrPjaZmRtyZJtpYa1QeZxTYsdTGnk3n9ZJ2fto7HnPCgAcYeYAGVrfzw249PPPIqsLVr0N2XI3rVR9KYsAcoila89QAGI69gFuPVvH0fWtBIgdjDlkbt2rqcAxHXsAtz2108gazff/CWsBmkhwHUxAUKzVrz0IAUgrmMTIHLbX/0RshYTQIulUApA8ovuAsQOhgKQ/GAXYOmWJ5G1efO+EEL2HFn0pKZZAoRX79hAAYjrxAsQjgmgxRzAEiBMAUheoAAk0FAAEmgoAAk0FIAEGgpAAg0FiGfmpkPixodr4v47mVpwDnAunP/dVShAPLc8+YH49hvtYvZDlMArZsm+xznAuXD+nqtQgHiWfvZD0X9hTOx+q5MSeADCj77HOcC5cP6+q1CAeNDpAxfHxPj4FXUi5j4S/2dIfkBfvyz7HH2Pc0ABPBTgypUrYnR0XLz8o04x/1Hz2+mR/IE+3iX7Gn2OvqcAGggAhkfGxa79nWLB4xwO5Yv5sm/Rx+hrq98pgCYCgKHhcbFzf4eUgHcCt0Gfom/Rx/Y+pwAaCWBKMEYJXOZq+OP7mwJoJoAlwS5I8BiHQ7mCPkwWfgpglnYCADUnkJO1mzgxzhr0HfrQPuZ3QgE0FQCMjI6Ll37YIWZxxzhj0GdYWUMfOvuVAlxb2goARsfGxY590bi/T1KDPkPfOfvTCQXQXAALnFDeCSYHfYS+cvZfMiiATwRQd4IfRMXcRzgnSAb6Bn2UzpXfggL4RACAydx2eYK5YxwP+gR9k2rCmwgK4CMBAJbztr8Z5RKpDfQF+iTZUmcqKIDPBACXhyiBhRV+9Imzn9KBAvhQAGBJMC/AEqDtuYQfUACfCgAux4ZDQdwsQ5tV+LMY9tihAD4WAFgT4zmbg3MnQFuzmfAmggL4XACA3U4s/92Q73dbNQBtRFsn2+FNFwpQAAIAvN2EDaBClkCFX7YRbXW2P1soQIEIAJQEBTocQpvQNjfDDyhAAQkAMDTA+LiQJsZqwuvisMcOBSgwAYCaGBfIEqm11OnGhDcRFKAABQDWEqmfN8smNrlyXOpMBQUoUAGAn3eMc93hTRcKUMACAEsCPz1Apx5sm4LwAwpQ4AIA9QCdTx6lxjHiWLN5sC0bKEAABACYRGIZUeeXatTLLC7t8KYLBQiIAED31yvTfY3RTShAgASw0O31ykxfY3QTChBAAUZGx8R33mzX4hvyZvMao5tQgIAJMD4+LkZHR8WlwSHxwp42T3eM8W+/sKd9Ssf8TihAgASwwj8yMiKGhobE+YFL4h/+7bQnEmCp859eb5+Spc5UUICACOAM/+XLl8WlS5dE78cD4lvfPTml+wRW+Ac9Dj+gAAEQIFn4L168KAYGBkRX9znx/GutYt4UzAlwt9El/IACFLgAk4X/3Llzor+/X0Q7e8W2f24RN22OP1a3wIRXh2GPHQpQwAKkG/6+vj7R29sr2qNd4tlXjuXlp1fiMxH+qdrhTRcKUKACZBr+np4e0dXVJdrORsXW3U2u/uhQvMmF8Ofjef5coQAFKECm4e/u7lbh7+joENFoVLS1nRVbdzW6IoEV/jGX3+RyCwpQYALkGv6zZ89KAdrEqVOnxVd31uc0HLKGPbqGH1CAAhLArfCfPn1anDx5Uhw73iq++tLRrN4xtia8Og577FCAAhHA7fCfOHFCtLS0iPrGY+IrL9Zl9NiEtdSp24Q3ERSgAATIV/iPHz8umpubRd2RZvHMjrq09gl02eFNFwrgcwEyDb+12pNu+JuamhSHjzROKoFOO7zpQgF8LMBUhd+iLiZBos0y3XZ404UC+FSAfIb/2LFjceGfkOCoKYF9dQiTZD8Ne+xQAB8K4FX4LY7WmxLMfuh9iRl+Lx9pzgUK4DMBvA6/RUNDk5IA4ffqZRY3oAA+EiDT8Ge62uMMeSoaJXVN3XHH6DeaTg2KxZ/5IO78uAoFiCdTAbQKf2OzOHqsS4yN+/fKj2+ye6ZrSHw8MMo7gO4CZBJ+DHkShf/MmTOuhL9Bhr/heJc8Hv+Gf2zsijjbPaSGbhwCaS5AJuFPduV3M/yNLd3qpXrncfoFhD7aOzzxiAYF0FgA7cLf2i2GR1Ifs84g/B0y/PYVKwqgqQBahb/BHPb4Pvx914YfUAANBdAq/PLKf6S50//hd1z5LSiAZgLoFP7GxiZxuLHL12N+THgx5k8UfkABNBJAp/CDuqZOX29yYakTqz2p3kmgAJoIoFv4Dzd1qQA5A+MnsM4/mcAUQAMBMgl/vtf5MezBld/34e8clsOf1OEHFMBDAc7Jztcp/JjwYod3squmzkDcNnnlTyf8gAJ4JsAHov/CqFbhx1JnqvGy7mDC29l3dZMrHSiARwLc+sdSgPPDaYU/32N+Ff4WGX4fL3Xiit/18UhG4QcUwCMBlkgB+vovaxP+Ql3nnwwK4KEAvR8Peh/+AtjhjfZkF35AATwUoLv3kmfhxyPN9WrM79/wY9jT1jUoLg0Oq8UE5++nAwXwUICungsehb9JPd7g50easdpzqv2iOHf+grqLYi6VjQQUwEMBOrsHpjz8AI83pLtMqCstZ86L7p4+cf78eXURyVYCCuChANHOc1O61Gk92+MMgd9oOtEv2qMdqq/Qb+jDbCWgAJ4JUCvaOvqnMPzmU51+vvJj2NPQ2itOnjqt+gb9ZEmQ7Z2AAngkwNLPSAHa+6Yk/FjtwYTXz2N+iNvQ0iPbflz1BfrFDQkogIcCnDnbm/cx/9UdXv+u9mCps6m1R7UF7Uc/uCUBBfBIgMVSgFNnuvMffr9vcsm7VvOJHlHfcLXtk0mQyZyAAngowMnTXXkL/5GjjeLt/z0pLlwajTvpfgHfXv2d97rER3XxbZ9MgnTvBBTAQwFaT3bkJfxH65vEc7uPyBNbK176YUfWu6RegmPGsWOx4Os765TQzna6IQEF8FCA461R18Nf3yDD/8qRiW9jvuCxGhWkTB8S8xIcK44Zx4424LtRb5USoG3O9uYqAQXwVIB2V8OPdf5tMvzOH2mEb12OQGEZ0Rk23cAx4lhxzPY23Pjw+0oCtNHZ7nQkuHAh8Y4xBfBQgObjbdeEv7W1NafwP//qETHroffj/i2An9m1/QfRuMDpBo4Rx+o8foCfWrl1l7sSUADPBKgRjc2nXQk/hga48icLvwXuDN/Zq68EODbn3cuJkiDJcAikkgCrQ5BgcHBwQgIK4JEAS56sEQ1Np3IOv5rwJhj2JGO2/HMv7uvQ6rVHHAuOCcfmPN5EWMOhbCbGTgnwVh7eznP+G65CAeL5lBTgaMOJnMKPAGC1J9XP7UrEvEf0WR2yVntwTM7jTAUmxslWh0A6EmA41Nc/pJ7Lcn6+q1CAeCDAkfrcwv/s7jox/9H4z06HebHVIS9/lCn+bRX+2GpPpkB8SICfXebsn3TvBHgngwJ4JEDd0dzCv+Cx+M/NBGuJ1AsJrPBbS53ZctOjMQkS3AkmkwAT42j3AAXwSoCP6o5lHH78fK7nEP4sr/xO5j9uDoemUgIr/Pi3nceTDZYE6Btnf00mQXtHPwXwSoAPD2cW/vrYDm+2w55kWHeCqZgTWGP+XK/8TiAB+gZ95Oy3VBLggUQ8mOj8PFehAPFAgN9/FH+yktEQ2+RK9DN63cCaE+RzdQifncuYfzLQN+gj9JWz/5JJgOexsCfj/CxXoQDxQIAPMhAAm1xY/nN+jptgJQbLkc7gugU+O9PVnkxBH6GvnP2XTIKWE1EKoLMAuJqpHd4En5EPsBa/Iw87xtjkSnedP1fQV+izRHcCAAmw/AwJsBtPATQVAONZ3NLzfeV3gk21l3/kzjfIxWfgyp/uRp1boM/Qd6nmBJAAm5HYlHT+fVehAPFMJoC52pO/Mf9k4HmcV36c22uU+Lv4jGTP9uQb9B36MNHqEIAE2IvBuXD+XVehAPGkEsDc4c1+k8stsFKDAGezOoS/g7/r9mpPpqAP0ZeJdoxxJ8BSNAXQSICJTS6Pw2+x4HHzTjA0nL4E+LMq/C6t8+cK+hJ9mkgCrMRRAE0EcGuH120WPpG+BFb48Xecn+Ml6NNEEuAcUAANBLBeY/R62JMMS4JUwyFr2KNb+C3M4RDmBBTAXp4L4HyNUVes4VCiibE14dVl2JMM9DH62nqfgAJ4LECy1xh1xZoY25dI8WsdJrzpgr5Gn6PvKYCHAtT+X+rXGHUFy5rYJ7AEwK+9WurMFvQ5+h7ngAJ4IMDCJw6JZ3Yc9l34LXAV3bW/U+GXu5cT9D3OAc6F8/dchQLEg3dbp3qH120QfL+G3wLnAOfC+d9dhQKQQEMBSKChACTQUAASaCgACTQUgAQaCkACDQUggYYCkEBDAUigoQAk0FAAEmgoAAk0fhKgfFPNGAUgrqK7AMaiz5fJr+Hpd+1YLw92iAIQV6muvYJMla/99+GS27Y8gawZNz+Ji64mAiypKpVfQ8XLnr4zUn0gClspAHENCFB9UITu/X530cKn/tCAAIvW4qKrhQDXGcbyYvkVt6S54Q2//T0FIK4CAap+I0J3v9YoM7bQzFpFiZk97wsHMd2YXTFDfp0bWf/OG2oIhIN2NoSQbJBZCj3wc1F25wv/iYzFsjY9lj3PyxTghsqZ8uvc0MoXvxCpeg8HjYP/JK4xhGREzSe4oIbv2ytKlj29BRkzZq2apTKniQAYh8mDmYch0BzJktD9P/kQEpRXHRqNbxAhmVAzGl7/3yK0cnuDzNYyM2Nzw2bm9JgD4CCul5QZ4WU3ya+3lN6+9Yu4ZWHiwrkAyRoMfaoPiPA935NX/y8/jWwZoaXzVNbMzGklQKlhzLzBKJt9i/z1baFVL74eWfcTEak6gFsYJSCZoeaQcviz5g0RuvPZ/ciUmS2ZMZU1fQRAYSyGlaAZRvmcm+XXWyV3hu7a8dPQ2rdEeOPvhNohRoOcDSXkGpARmRXMI1X4n/8fZEllquxGrABhAoysIXNaCVBkmEuhc4ySmRDg05K7Qnf8/b7Imj0i9MB/mUMitaZrA3cHElzi8yDC638hIpXfFZHlW9+SGVqpsmRmCnNMZAxZ02ICbJVtGGRgNWi+URK5XX5dXlRUtLJk6V98pWz19iYYjWFRaMOvhDIcxmO1iAQXGXiM8yMb3hXh+38qr/qvi7IV324uXvanf4fsIEOxLM2PZUu74Y9V9rvAjZJFRnHkD4zi0Ao0RHJvqOLPv45bWvmqHS2Ru1/tk0KMlN735njZmj1jJHiU3rd3PHzfnlF5te8rX7m9RWbjl+VL/+wbMitrVPhldlSGkCUzU1pe/a2y7gLYoYsYWK/FrN0oud0omgWTIcFqyd3Tp09fWzx73Z+ULn7qiyWfeuovwySQlCz83JeRAWQBmUA2kBFkxcxMCa78WFRBlpApZEvLq79VsT0BdZtSO8OG2YAKOW+5QzZqVVH5LEiwypKBkCIzCyobMiOrVVZUZibCjywhU9qs/ScrHJy5M3xVAkxcsDK0xMBSlmHIW1rxCqMotMoomikbP6dScg8JJJXIgMzCSpUJlQ2VEWQFmUF27OHXauUnWdklwC0Lu3ZYu8UmGZaxFkuWGqbhaCxucyS4IAPIAjKBbCAjyAoyg+wgQ74Jv1WWBBivFRvmzh3GcGgUrEYDFxim5WgwCS7IALKATCAbyAiygswgO8iQr8JvL/vdAI1R7w0Yptm4tWFZCw82WaDxpPCxn3NkAFlAJpANZARZ8d1VP1mhAfY7AhqGpSw0Erc3gEaT4GGdf2QBmUA27Fd834ffXnYRLNBYQuyZKLjgpyqrsSTYsFgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFyr/8HB97mpWPGJawAAAAASUVORK5CYII=","alt":"Maiar Logo"}}),_vm._v("\n        Login with Maiar app\n    ")]):_vm._e()]):_vm._e()}
var MaiarLoginvue_type_template_id_3feafd8f_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/platform/platform.js
var platform = __webpack_require__(1795);
var platform_default = /*#__PURE__*/__webpack_require__.n(platform);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/maiar/MaiarLogin.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var MaiarLoginvue_type_script_lang_js_ = ({
  name: 'MaiarLogin',
  data: function data() {
    return {
      openContent: false,
      qrcode: null,
      deeplink: null
    };
  },
  props: {
    selectedMode: {
      type: String,
      default: ''
    },
    qrcodeHandler: {
      require: true,
      default: function _default() {
        return new maiar_QRCodeDefaultHandler();
      }
    },
    token: {
      require: false,
      type: String
    }
  },
  watch: {
    selectedMode: function selectedMode(_selectedMode) {
      if (_selectedMode === 'Maiar') {
        this.login();
      } else {
        this.openContent = false;
      }
    }
  },
  methods: {
    isMobile: function isMobile() {
      return (platform_default()).os.family === "iOS" || (platform_default()).os.family === "Android";
    },
    login: function login() {
      var _this = this;

      console.log("Maiar App Login");
      this.openContent = true;
      this.qrcode = null;
      this.deepLink = null;
      var that = this;
      var options = this.token ? {
        token: this.token
      } : {};
      this.$erd.maiarApp.login(options).then(function (loginData) {
        console.log(loginData);

        _this.qrcodeHandler.handle(loginData.qrCodeData, _this.$refs.qrcode).then(function (svg) {
          if (svg) {
            _this.qrcode = svg;
          }
        });

        that.deeplink = loginData.deeplink;
        that.$emit('login', loginData);
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/components/maiar/MaiarLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var maiar_MaiarLoginvue_type_script_lang_js_ = (MaiarLoginvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/maiar/MaiarLogin.vue





/* normalize component */
;
var MaiarLogin_component = normalizeComponent(
  maiar_MaiarLoginvue_type_script_lang_js_,
  MaiarLoginvue_type_template_id_3feafd8f_render,
  MaiarLoginvue_type_template_id_3feafd8f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MaiarLogin = (MaiarLogin_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ledger/LedgerLogin.vue?vue&type=template&id=451f42d4&
var LedgerLoginvue_type_template_id_451f42d4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.openContent)?_c('div',{staticClass:"vue3rdj5__mode"},[(_vm.error)?_c('div',{staticClass:"vue3rdj5__mode-error",attrs:{"error":_vm.error}},[_vm._v("\n        "+_vm._s(_vm.error)+"\n    ")]):(_vm.accounts.length === 0)?_c('div',{staticClass:"vue3rdj5__infos"},[_c('p',{staticClass:"vue3rdj5__infos-txt"},[_vm._v("Please connect and unlock your Ledger Wallet.")]),_vm._v(" "),_c('p',{staticClass:"vue3rdj5__infos-txt"},[_vm._v("Don't forget to open Elrond APP")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"vue3rdj5__ledger"},[_c('ul',{staticClass:"vue3rdj5__ledger-list"},_vm._l((_vm.accounts),function(account,index){return _c('li',{key:index,staticClass:"vue3rdj5__ledger-item"},[_c('a',{staticClass:"vue3rdj5__ledger-link",attrs:{"href":"#"},on:{"click":function($event){return _vm.login(_vm.startIndex + index)}}},[_vm._v(_vm._s(account))])])}),0)])]):_vm._e()}
var LedgerLoginvue_type_template_id_451f42d4_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(561);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(5003);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(9337);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/ledger/LedgerLogin.vue?vue&type=script&lang=js&



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }











//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var LedgerLoginvue_type_script_lang_js_ = ({
  name: 'LedgerLogin',
  data: function data() {
    return {
      startIndex: 0,
      accounts: [],
      error: null,
      openContent: false
    };
  },
  props: {
    addressPageSize: {
      type: Number,
      default: 5
    },
    selectedMode: {
      type: String,
      default: ''
    },
    token: {
      require: false,
      type: String
    }
  },
  watch: {
    selectedMode: function selectedMode(_selectedMode) {
      if (_selectedMode === 'Ledger') {
        this.fetchAccounts();
      } else {
        this.openContent = false;
      }
    }
  },
  methods: {
    fetchAccounts: function fetchAccounts() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.openContent = true;
                _this.error = null;

                _this.accounts.splice(0);

                _context.next = 5;
                return _this.$erd.ledger.accounts(_this.startIndex, _this.startIndex + _this.addressPageSize).catch(function (error) {
                  _this.error = "Error while trying to read your Ledger wallet. " + "Please make sure you have unlock it and that your Elrond app is opened";
                  return [];
                });

              case 5:
                _this.accounts = _context.sent;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    next: function next() {
      this.startIndex = this.startIndex + this.addressPageSize;
      this.fetchAccounts();
    },
    previous: function previous() {
      if (this.startIndex == 0) {
        return;
      }

      this.startIndex = this.startIndex - this.addressPageSize;

      if (this.startIndex <= 0) {
        this.startIndex = 0;
      }

      this.fetchAccounts();
    },
    login: function login(index) {
      var token = this.token ? {
        token: this.token
      } : {};
      this.$erd.ledger.login(_objectSpread({
        addressIndex: index
      }, token));
    }
  }
});
;// CONCATENATED MODULE: ./src/components/ledger/LedgerLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var ledger_LedgerLoginvue_type_script_lang_js_ = (LedgerLoginvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/ledger/LedgerLogin.vue





/* normalize component */
;
var LedgerLogin_component = normalizeComponent(
  ledger_LedgerLoginvue_type_script_lang_js_,
  LedgerLoginvue_type_template_id_451f42d4_render,
  LedgerLoginvue_type_template_id_451f42d4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LedgerLogin = (LedgerLogin_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/web/WebWalletLogin.vue?vue&type=template&id=2684b018&
var WebWalletLoginvue_type_template_id_2684b018_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue-erdjs-tab',{attrs:{"name":"Web Wallet"},on:{"select-mode":function($event){return _vm.login($event)}}})}
var WebWalletLoginvue_type_template_id_2684b018_staticRenderFns = []


// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__(4765);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/web/WebWalletLogin.vue?vue&type=script&lang=js&


//
//
//
//
//
//

/* harmony default export */ var WebWalletLoginvue_type_script_lang_js_ = ({
  name: 'WebWalletLogin',
  components: {
    VueErdjsTab: VueErdjsTab
  },
  props: {
    token: {
      require: false,
      type: String
    }
  },
  mounted: function mounted() {
    this.$erd.webWallet.callbackReceived(window.location.search);
  },
  methods: {
    login: function login(name) {
      this.$emit('select-mode', name);
      var options = this.token ? {
        token: this.token
      } : {};
      this.$erd.webWallet.login(options);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/web/WebWalletLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var web_WebWalletLoginvue_type_script_lang_js_ = (WebWalletLoginvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/web/WebWalletLogin.vue





/* normalize component */
;
var WebWalletLogin_component = normalizeComponent(
  web_WebWalletLoginvue_type_script_lang_js_,
  WebWalletLoginvue_type_template_id_2684b018_render,
  WebWalletLoginvue_type_template_id_2684b018_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WebWalletLogin = (WebWalletLogin_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/defi/DefiWalletLogin.vue?vue&type=template&id=01b1586b&
var DefiWalletLoginvue_type_template_id_01b1586b_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.openContent)?_c('div',{staticClass:"vue3rdj5__mode"},[(_vm.error)?_c('div',{staticClass:"vue3rdj5__mode-error"},[_vm._v("\n        "+_vm._s(_vm.error)+"\n    ")]):_c('div',{staticClass:"vue3rdj5__infos"},[_c('p',{staticClass:"vue3rdj5__infos-txt"},[_vm._v("\n            Please unlock your Defi Extension and select the wallet you want to connect.\n        ")]),_vm._v(" "),_c('p',{staticClass:"vue3rdj5__infos-txt"},[_vm._v("\n            If Nothing happen, you migth not have installed the Maiar Defi Wallet Extension.\n        ")]),_vm._v(" "),_vm._m(0)])]):_vm._e()}
var DefiWalletLoginvue_type_template_id_01b1586b_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"vue3rdj5__infos-txt"},[_vm._v("\n            You can download it "),_c('a',{staticClass:"vue3rdj5__infos-link",attrs:{"href":"https://chrome.google.com/webstore/detail/maiar-defi-wallet/dngmlblcodfobpdpecaadgfbcggfjfnm"}},[_vm._v("here")])])}]


;// CONCATENATED MODULE: ./src/components/defi/DefiWalletLogin.vue?vue&type=template&id=01b1586b&

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/defi/DefiWalletLogin.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var DefiWalletLoginvue_type_script_lang_js_ = ({
  name: 'DefiWalletLogin',
  data: function data() {
    return {
      error: null,
      openContent: false
    };
  },
  props: {
    selectedMode: {
      type: String,
      default: ''
    },
    token: {
      require: false,
      type: String
    }
  },
  watch: {
    selectedMode: function selectedMode(_selectedMode) {
      console.log("Defi", _selectedMode);

      if (_selectedMode === 'Defi Wallet') {
        this.login(_selectedMode);
        this.openContent = true;
      } else {
        this.openContent = false;
      }
    }
  },
  methods: {
    login: function login(name) {
      this.$emit('select-mode', name);
      var options = this.token ? {
        token: this.token,
        callbackUrl: window.location
      } : {};
      this.$erd.defiWallet.login(options);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/defi/DefiWalletLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var defi_DefiWalletLoginvue_type_script_lang_js_ = (DefiWalletLoginvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/defi/DefiWalletLogin.vue





/* normalize component */
;
var DefiWalletLogin_component = normalizeComponent(
  defi_DefiWalletLoginvue_type_script_lang_js_,
  DefiWalletLoginvue_type_template_id_01b1586b_render,
  DefiWalletLoginvue_type_template_id_01b1586b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DefiWalletLogin = (DefiWalletLogin_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/web/WebWalletCallback.vue?vue&type=template&id=15cd1476&
var WebWalletCallbackvue_type_template_id_15cd1476_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span')}
var WebWalletCallbackvue_type_template_id_15cd1476_staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/web/WebWalletCallback.vue?vue&type=script&lang=js&


//
//
//
//
/* harmony default export */ var WebWalletCallbackvue_type_script_lang_js_ = ({
  name: 'WebWalletCallback',
  mounted: function mounted() {
    this.$erd.webWallet.callbackReceived(window.location.search);

    if (this.$erd.logged) {
      this.$emit('logged', {
        address: this.$erd.walletAddress,
        token: this.$erd.token
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/components/web/WebWalletCallback.vue?vue&type=script&lang=js&
 /* harmony default export */ var web_WebWalletCallbackvue_type_script_lang_js_ = (WebWalletCallbackvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/web/WebWalletCallback.vue





/* normalize component */
;
var WebWalletCallback_component = normalizeComponent(
  web_WebWalletCallbackvue_type_script_lang_js_,
  WebWalletCallbackvue_type_template_id_15cd1476_render,
  WebWalletCallbackvue_type_template_id_15cd1476_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var WebWalletCallback = (WebWalletCallback_component.exports);
;// CONCATENATED MODULE: ./src/components/index.js







/* harmony default export */ var components = ([VueErdjsConnect, MaiarLogin, LedgerLogin, WebWalletLogin, DefiWalletLogin, WebWalletCallback]);
;// CONCATENATED MODULE: ./src/VueErdJs.ts
var VueErdJs = /** @class */ (function () {
    function VueErdJs(providers, store, explorerUrl) {
        this._store = store;
        this._providers = providers;
        this._explorerUrl = explorerUrl;
    }
    Object.defineProperty(VueErdJs.prototype, "logged", {
        get: function () {
            return this._store.logged;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "walletAddress", {
        get: function () {
            return this._store.walletAddress;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "token", {
        get: function () {
            return this._store.token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "obfuscatedWalletAddress", {
        get: function () {
            if (!this.walletAddress || this.walletAddress.isEmpty()) {
                return undefined;
            }
            var keepNbChar = 6;
            return this.walletAddress.bech32().slice(0, keepNbChar) +
                '...' +
                this.walletAddress.bech32().slice(-keepNbChar);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "maiarApp", {
        get: function () {
            return this._providers.maiarApp;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "ledger", {
        get: function () {
            return this._providers.ledger;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "webWallet", {
        get: function () {
            return this._providers.webWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "defiWallet", {
        get: function () {
            return this._providers.defiWallet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "providers", {
        get: function () {
            return this._providers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "proxy", {
        get: function () {
            return this.providers.proxy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VueErdJs.prototype, "api", {
        get: function () {
            return this.providers.api;
        },
        enumerable: false,
        configurable: true
    });
    VueErdJs.prototype.logout = function () {
        this.providers.logout();
    };
    VueErdJs.prototype.explorerTransactionUrl = function (transaction) {
        return "".concat(this._explorerUrl, "/transactions/").concat(transaction.getHash());
    };
    VueErdJs.prototype.$on = function (event, callback) {
        return this._store.$on(event, callback);
    };
    VueErdJs.prototype.$once = function (event, callback) {
        return this._store.$once(event, callback);
    };
    VueErdJs.prototype.$off = function (event, callback) {
        return this._store.$off(event, callback);
    };
    return VueErdJs;
}());
/* harmony default export */ var src_VueErdJs = (VueErdJs);

;// CONCATENATED MODULE: ./src/VueErdJsPlugin.ts






var vueErdJsStore = new src_VueErdJsStore();

function VueErdJsPlugin(Vue, options) {
    if (!options) {
        options = config(ElrondEnvEnum.DEVNET);
    }
    var erdApi = new erdjs_.ApiProvider(options.api.url, { timeout: options.api.timeout });
    var erdProxy = new erdjs_.ProxyProvider(options.proxy.url, { timeout: options.proxy.timeout });
    erdjs_.NetworkConfig.getDefault().sync(erdProxy);
    var providers = new providers_Providers(erdProxy, erdApi, options, function (address, token) {
        vueErdJsStore.state.$data.walletAddress = address;
        if (token) {
            vueErdJsStore.state.$data.token = token;
        }
    }, function () {
        vueErdJsStore.state.$data.walletAddress = null;
        vueErdJsStore.state.$data.token = null;
    }, function (transaction) {
        vueErdJsStore.$emit('transaction', transaction);
    });
    var vueErdJs = new src_VueErdJs(providers, vueErdJsStore, options.explorer.url);
    Vue.prototype.$erd = vueErdJs;
    Vue.mixin({
        beforeCreate: function () {
            vueErdJs.providers.init();
        },
        beforeMount: function () {
            vueErdJs.providers.onUrl(window.location);
        }
    });
    for (var _i = 0, Components_1 = components; _i < Components_1.length; _i++) {
        var component = Components_1[_i];
        Vue.component(component.name, component);
    }
}

;// CONCATENATED MODULE: ./src/index.ts



/* harmony default export */ var src = (VueErdJsPlugin);

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});