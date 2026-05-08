// Standard response helper placeholder
export function sendResponse(res, data, message = 'OK') {
  res.json({ message, data });
}
