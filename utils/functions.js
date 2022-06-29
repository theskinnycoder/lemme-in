export function formatUser(user) {
  if (!user) {
    return null;
  }

  const data = user?.user_metadata;

  return {
    id: user?.id ?? "",
    name: data?.name ?? data?.full_name,
    photo: data?.avatar_url ?? data?.picture ?? "",
    email: data?.email ?? "",
  };
}
