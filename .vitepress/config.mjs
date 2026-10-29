import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Mountains and Rivers',
  description: "CS Noob's personal site",

  // 本地存在但不属于站点的文件（Obsidian Copilot、旧笔记等），
  // 不排除会让 docs:dev / docs:build 直接报错
  srcExclude: [
    'copilot/**',
    '0621bgpic.md',
    'lab-notes/docx-md&pic&sidebar.md'
  ],

  themeConfig: {
    siteTitle: 'Mountains and Rivers',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'CS Notes', link: '/csnotes' },
      { text: 'Others', link: '/others' }
    ],

    sidebar: [
      {
        text: 'Study',
        items: [
          {
            text: 'CS Study',
            link: '/csnotes',
            items: [
              {
                text: 'Lab Notes',
                items: [
                  { text: '0413 Lab Report', link: '/lab-notes/0413lab' },
                  { text: '0420 Lab Report', link: '/lab-notes/0420lab' },
                  { text: '0525 Lab Report', link: '/lab-notes/0525lab' },
                  { text: '0601 Lab Report', link: '/lab-notes/0601lab' }
                ]
              },
              {
                  text: 'Linux',
                  items: [
                    { text: 'Hello Linux', link: '/linux/HelloLinux' },
                    { text: 'Linux commands', link: '/linux/Linux_commands' },
                    { text: 'gdb x command', link: '/linux/gdb_x_command' },
                    { text: 'Bomb Lab Related', link: '/linux/Bomb_Lab_Related' },
                    { text: 'Bomb Lab', link: '/linux/Bomb_Lab' },
                    { text: 'Attack Lab', link: '/linux/Attack_Lab' },
                    { text: 'Shell Lab', link: '/linux/shlab' }
                  ]
              }
            ]
          }
        ]
      },
      {
        text: 'Interests',
        items: [
          { text: 'GeoGuessr', link: '/interests/geoguessr' },
          { text: 'Three Years', link: '/interests/three_years' }
        ]
      },
      {
        text: 'Misc',
        items: [
          { text: 'Others', link: '/others' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LuanJiangXing' }
    ],

  }
})