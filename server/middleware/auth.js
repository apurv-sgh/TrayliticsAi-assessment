import jwt from 'jsonwebtoken'

export function signToken(userId) {
  return jwt.sign({ sub: userId }, getSecret(), { expiresIn: '7d' })
}

function getSecret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')
  return process.env.JWT_SECRET
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.access_token
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    req.userId = jwt.verify(token, getSecret()).sub
    return next()
  } catch {
    return res.status(401).json({ message: 'Session expired' })
  }
}
