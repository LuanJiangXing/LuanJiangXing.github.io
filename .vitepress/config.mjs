import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Mountains and Rivers',
  description: "CS Noob's personal site",

  themeConfig: {
    siteTitle: 'Mountains and Rivers',

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
                  { text: '0420 Lab Report', link: '/lab-notes/0420lab' }
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
                    { text: 'Attack Lab', link: '/linux/Attack_Lab' }
                  ]
              }
            ]
          }
        ]
      },
      {
        text: 'Interests',
        items: [
          { text: 'GeoGuessr', link: '/interests/geoguessr' }
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