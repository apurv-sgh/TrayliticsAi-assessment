import jwt from 'jsonwebtoken'

export function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.access_token
  if (!token) return res.status(401).json({ message: 'Authentication required' })
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET || 'development-secret').sub
    return next()
  } catch {
    return res.status(401).json({ message: 'Session expired' })
  }
}
