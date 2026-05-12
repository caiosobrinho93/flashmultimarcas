export function prefixPath(path: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  const base = isProd ? '/flashmultimarcas' : '';
  
  // Ensure we don't double slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
