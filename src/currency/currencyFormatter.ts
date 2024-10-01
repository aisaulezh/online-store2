


const FORMATTER_CURRENCY =
        new Intl.NumberFormat(undefined,
            { style: 'currency', currency: 'USD' });


   export function formatterCurrency(number: number) {
       return FORMATTER_CURRENCY.format(number);
   }