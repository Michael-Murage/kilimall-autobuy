// goods_id and the amount of items separated by a | like '18414516|1'
const cart_id = '';

const quantity = 1;

// addressId of your pickup station, it is of type number
const addressId = 0;

// phone number paying for the said goods starting with 7 or 1 not 0
const phone = ''; 

// random letters and numbers that should act as an identifying factor for the transaction
// below is a random example
const pay_sn = '42SKJPRBVA'; 

// Bearer token of your current login
const bearer = 'Bearer ...'

const buyNow = document.getElementById('buyNow');

async function buy() {
  try {
    const addressResp = await fetch('https://api.kilimall.com/ke/v1/user/address', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'authorization': bearer,
      },
      method: 'POST',
      body: JSON.stringify({
        action: 'select'
      })
    });

    const buyDataResp = await fetch('https://api.kilimall.com/ke/v1/user/buyData', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'authorization': bearer,
      },
      method: 'POST',
      body: JSON.stringify({
        addressId, cart_id, flash_buy: 1, ifcart: 0
      })
    });

    const checkOutOrderResp = await fetch('https://api.kilimall.com/ke/v1/user/checkOutOrder', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'authorization': bearer,
      },
      method: 'POST',
      body: JSON.stringify({
        addressId, 
        cart_id, 
        flash_buy: 1, 
        ifcart: 0, 
        shipping_voucher: '',
        voucher: '',
        voucher_code: '',
      })
    });

    const payResp = await fetch('https://api.kilimall.com/ke/v1/user/pay', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'authorization': bearer,
      },
      body: JSON.stringify({
        method: 'OP',
        pay_sn,
        phone,
        source: 1,
      })
    })

    const payInfoResp = await fetch(`https://api.kilimall.com/ke/v1/user/payInfo?pay_sn=${pay_sn}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'authorization': bearer,
      },
    })
    
    if (buyDataResp.ok) {
      const jsonResp = await buyDataResp.json();
      console.log(jsonResp);
    } else {
      const errorResp = await resp.json();
      console.warn(errorResp);
    }

    if (checkOutOrderResp.ok) {
      const jsonResp = await checkOutOrderResp.json();
      console.log(jsonResp);
    } else {
      const errorResp = await resp.json();
      console.warn(errorResp);
    }

    if (payResp.ok) {
      const jsonResp = await payResp.json();
      console.log(jsonResp);
    } else {
      const errorResp = await resp.json();
      console.warn(errorResp);
    }

    if (payInfoResp.ok) {
      const jsonResp = await payInfoResp.json();
      console.log(jsonResp);
    } else {
      const errorResp = await resp.json();
      console.warn(errorResp);
    }
  } catch (error) {
    console.log(error);
  }
}

buyNow.addEventListener('click', buy);
