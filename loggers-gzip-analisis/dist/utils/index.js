"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrime = void 0;
const isPrime = (num) => {
    if ([2, 3].indexOf(num) >= 0)
        return true;
    else if ([2, 3].some((n) => num % n == 0))
        return false;
    else {
        let i = 5, w = 2;
        while (i * i <= num) {
            if (num % i == 0)
                return false;
            i += w;
            w = 6 - w;
        }
    }
    return true;
};
exports.isPrime = isPrime;
