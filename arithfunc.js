const _A1 = 5.575192695;
const _A2 = 12.77436324;
const _B1 = 14.38718147;
const _B2 = 31.53531977;
const _Root2pi = 2.5066282746310002;
const _IPI = 0.3183098861837907;
//const _iter = 0;
// var S0 = prompt('Spot Price', 'S0');
const btn=document.getElementById('btn');
btn.addEventListener('click', pricing);

function norm(x){
    if(x > 15) {
        return 1;
    }
    else if (x < -15) {
        return 0;
    }
    else {
        let z = Math.abs(x);
        let expz = Math.exp(-z*z/2);
        let xs = z * z;
        let numer = xs + _A1*z + _A2;
        let denom = _Root2pi*xs*z + _B1*xs + _B2*z + 2*_A2;
        if (x > 0) {
            return 1 - expz*(numer/denom);
        }
        else
            return expz*(numer/denom);
    }
}
// console.log(norm(1));
function bsm_call(S, K, T, r, sigma) {
    let d1 = (Math.log(S/K) + (r + 0.5*Math.pow(sigma, 2))*T)/(sigma*Math.sqrt(T));
    let d2 = d1 - sigma*Math.sqrt(T);
    return  S*norm(d1) - Math.exp(-r*T)*K*norm(d2);
}
function bisection_call(S, K, T, r, P) {
    let ub = 10;
    let lb = 1e-5;
    let count = 0;
    if (bsm_call(S, K, T, r, ub)-P<0){
        return ub;
    }
    else if (bsm_call(S, K, T, r, lb)-P>0){
        return lb;
    }
    let temp = 0;
    while (Math.abs(ub - lb)>1e-6 && count<50){
        count+=1;
        temp = (ub+lb)/2;
        if (bsm_call(S, K, T, r, temp) - P > 0) {
            ub = temp;
        }
        else
            lb = temp;
    }
    return ub;
}
function pricing(){
    var S0 = document.getElementById('spot').valueAsNumber;
    var K = document.getElementById('k').valueAsNumber;
    var T = document.getElementById('t2m').valueAsNumber;
    var r = document.getElementById('r').valueAsNumber;
    var sig = document.getElementById('sigma').valueAsNumber;
    // console.log(S0, K, T, r, typeof sig);
    var p = bsm_call(S0, K, T, r, sig);
    document.getElementById('result').innerHTML = p;
}
// console.log(norm(1));
// console.log(bsm_call(1650, 1300, 0.01, 0.02, 1.05));
// console.log(bisection_call(1600, 1300, 0.01, 0.02, 305));