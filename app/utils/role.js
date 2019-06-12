export default function getRole(user) {
  const clipEmployee =
    user &&
    user.Clipemployee &&
    user.Clipemployee.Role &&
    user.Clipemployee.Role.slug
      ? user.Clipemployee.Role.slug
      : null;
  const creditEmployee =
    user && !user.Clipemployee && user.Type ? user.Type.slug : null;
  const role = creditEmployee || clipEmployee;
  return role;
}
