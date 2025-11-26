// index.ts
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export interface PressFreedomData {
  country: string;
  code: string;
  score: number;
  rank: number;
  year?: number;
  region?: string;
}

export interface RelatedLink {
  article_id: string;
  title: string;
  part_text: string;
  image_url: string;
  image_url_a?: string;
  href: string;
  writers: string;
  release_date: string;
}