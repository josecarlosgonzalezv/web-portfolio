export type Project = {
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  img?: string;
};

export type SocialLink = {
  id: string;
  icon: string;
  url: string;
};

export type SkillsCategory = {
  title: string;
  skills: string[];
};
