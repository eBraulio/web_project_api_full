export const { NODE_ENV, JWT_SECRET } = process.env;
export const token = jwt.sign(
  { _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'topSecret'
);

export const allowedOrigins = [
  'http://ebraulio.chickenkiller.com',
  'http://www.ebraulio.chickenkiller.com',
  'https://ebraulio.chickenkiller.com',
  'https://www.ebraulio.chickenkiller.com',
  'http://localhost:3000',
  'https://localhost:3000',
];
