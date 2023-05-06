const { verifyToken, generateToken } = require("../../src/utils/jwt");
const {
  JwtError,
  InvalidTokenError,
  TokenNotProvided,
} = require("../../src/errors/JwtError");

const secret = "secret";
const secret1 = "secret1";

test("generateToken", () => {
  const token = generateToken({ id: 1, username: "john doe" }, secret);
  expect(typeof token).toBe("string");

  const decoded = verifyToken(token, secret);
  expect(decoded.id).toBe(1);
  expect(decoded.username).toBe("john doe");
});

// Si da este error puede que el token no se haya generado con mismo secret (es invalido)
test("verifyToken el token no es válido error", () => {
  const token = generateToken({ id: 1 }, secret);
  const token1 = generateToken({ id: 2 }, secret1);

  const f = () => verifyToken(token, "invalid_secret");
  expect(f).toThrow(InvalidTokenError);
  expect(f).toThrow("El token no es válido");

  const f1 = () => verifyToken(token1, secret);
  expect(f1).toThrow(InvalidTokenError);
  expect(f1).toThrow("El token no es válido");

  const f2 = () => verifyToken("not a token", secret);
  expect(f2).toThrow(InvalidTokenError);
  expect(f2).toThrow("El token no es válido");
});

test("verifyToken el token no es válido error", () => {
  const f = () => verifyToken(undefined, secret);
  expect(f).toThrow(TokenNotProvided);
  expect(f).toThrow("El token no fue proporcionado");

  const f1 = () => verifyToken(null, secret);
  expect(f1).toThrow(TokenNotProvided);
  expect(f1).toThrow("El token no fue proporcionado");
});

test("verifyToken secret or public key must be provided error", () => {
  const token = generateToken({ id: 1, username: "john doe" }, secret);

  const f = () => verifyToken(token, "");

  expect(f).toThrow(JwtError);
  expect(f).toThrow("secret or public key must be provided");

  const f1 = () => verifyToken(token, undefined);

  expect(f1).toThrow(JwtError);
  expect(f1).toThrow("secret or public key must be provided");

  const f2 = () => verifyToken(token, null);

  expect(f2).toThrow(JwtError);
  expect(f2).toThrow("secret or public key must be provided");
});

test("verifyToken secretOrPublicKey is not valid key material error", () => {
  const token = generateToken({ id: 1, username: "john doe" }, secret);

  const f = () => verifyToken(token, 1);

  expect(f).toThrow(JwtError);
  expect(f).toThrow("secretOrPublicKey is not valid key material");
});
