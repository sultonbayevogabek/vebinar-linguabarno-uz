function getUserDeviceInfo() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const userAgent = navigator.userAgent;

  // Qurilma turini aniqlash
  let deviceType = 'Noutbuk/Desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    deviceType = 'Telefon';
  } else if (/tablet|ipad/i.test(userAgent)) {
    deviceType = 'Planshet';
  }

  // Qurilma modelini aniqlash
  let deviceModel = 'Noma\'lum qurilma';
  if (/iPhone/i.test(userAgent)) deviceModel = 'iPhone';
  else if (/Samsung/i.test(userAgent)) deviceModel = 'Samsung Galaxy';
  else if (/Macintosh/i.test(userAgent)) deviceModel = 'iMac';

  // OS aniqlash
  let os = 'Noma\'lum OS';
  if (/Windows NT 10.0/i.test(userAgent)) os = 'Windows 10';
  else if (/Windows NT 6.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/Mac OS X/i.test(userAgent)) os = 'macOS';
  else if (/iPhone OS/i.test(userAgent)) os = 'iOS';
  else if (/Android/i.test(userAgent)) os = 'Android';

  // Brauzer aniqlash
  let browser = 'Noma\'lum brauzer';
  if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) {
    const version = userAgent.match(/Chrome\/(\d+\.?\d*)/)?.[1] || '';
    browser = `Chrome ${version}`;
  } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    const version = userAgent.match(/Version\/(\d+\.?\d*)/)?.[1] || '';
    browser = `Safari ${version}`;
  } else if (/Firefox/i.test(userAgent)) {
    const version = userAgent.match(/Firefox\/(\d+\.?\d*)/)?.[1] || '';
    browser = `Firefox ${version}`;
  } else if (/Edge/i.test(userAgent)) {
    const version = userAgent.match(/Edge\/(\d+\.?\d*)/)?.[1] || '';
    browser = `Edge ${version}`;
  }

  return {
    domain: window.location.hostname,
    deviceType: deviceType,
    deviceModel: deviceModel,
    displaySize: `${screen.width} x ${screen.height}`,
    screenWidth: `${screen.width}px`,
    screenHeight: `${screen.height}px`,
    operatingSystem: os,
    browser: browser,
    time: `${day}.${month}.${year} ${hours}:${minutes}`
  };
}

// Ishlatish uchun:

(async () => {
  const deviceInfo = getUserDeviceInfo();

  const formData = new FormData();
  formData.append('Sayt domeni', deviceInfo?.domain);
  formData.append('Qurilma turi', deviceInfo?.deviceType);
  formData.append('Qurilma modeli', deviceInfo?.deviceModel);
  formData.append(`Display o'lchami`, deviceInfo?.displaySize);
  formData.append(`Display eni`, deviceInfo?.screenWidth);
  formData.append(`Display bo'yi`, deviceInfo?.screenHeight);
  formData.append('Operatsion tizim', deviceInfo?.operatingSystem);
  formData.append('Brauzer', deviceInfo?.browser);
  formData.append('Vaqt', deviceInfo?.time);

  let response = await fetch('https://script.google.com/macros/s/AKfycbyycXYbss_rPI5kN2G2Xc-pDTiOglwudgJPqOQtsl3_lo7izK1mVSij1-1nWBPYhezLMA/exec', {
    method: 'POST',
    body: formData
  })

  response = await response.json();
})()
