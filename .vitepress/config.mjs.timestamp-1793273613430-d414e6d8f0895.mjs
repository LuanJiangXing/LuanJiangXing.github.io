// .vitepress/config.mjs
import { defineConfig } from "file:///sessions/keen-loving-ritchie/mnt/my-website/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig({
  title: "Mountains and Rivers",
  description: "CS Noob's personal site",
  // 本地存在但不属于站点的文件（Obsidian Copilot、旧笔记等），
  // 不排除会让 docs:dev / docs:build 直接报错
  srcExclude: [
    "copilot/**",
    "0621bgpic.md",
    "lab-notes/docx-md&pic&sidebar.md"
  ],
  themeConfig: {
    siteTitle: "Mountains and Rivers",
    search: {
      provider: "local"
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "CS Notes", link: "/csnotes" },
      { text: "Others", link: "/others" }
    ],
    sidebar: [
      {
        text: "Study",
        items: [
          {
            text: "CS Study",
            link: "/csnotes",
            items: [
              {
                text: "Lab Notes",
                items: [
                  { text: "0413 Lab Report", link: "/lab-notes/0413lab" },
                  { text: "0420 Lab Report", link: "/lab-notes/0420lab" },
                  { text: "0525 Lab Report", link: "/lab-notes/0525lab" },
                  { text: "0601 Lab Report", link: "/lab-notes/0601lab" }
                ]
              },
              {
                text: "Linux",
                items: [
                  { text: "Hello Linux", link: "/linux/HelloLinux" },
                  { text: "Linux commands", link: "/linux/Linux_commands" },
                  { text: "gdb x command", link: "/linux/gdb_x_command" },
                  { text: "Bomb Lab Related", link: "/linux/Bomb_Lab_Related" },
                  { text: "Bomb Lab", link: "/linux/Bomb_Lab" },
                  { text: "Attack Lab", link: "/linux/Attack_Lab" }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Interests",
        items: [
          { text: "GeoGuessr", link: "/interests/geoguessr" }
        ]
      },
      {
        text: "Misc",
        items: [
          { text: "Others", link: "/others" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/LuanJiangXing" }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL2tlZW4tbG92aW5nLXJpdGNoaWUvbW50L215LXdlYnNpdGUvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2tlZW4tbG92aW5nLXJpdGNoaWUvbW50L215LXdlYnNpdGUvLnZpdGVwcmVzcy9jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy9rZWVuLWxvdmluZy1yaXRjaGllL21udC9teS13ZWJzaXRlLy52aXRlcHJlc3MvY29uZmlnLm1qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6ICdNb3VudGFpbnMgYW5kIFJpdmVycycsXG4gIGRlc2NyaXB0aW9uOiBcIkNTIE5vb2IncyBwZXJzb25hbCBzaXRlXCIsXG5cbiAgLy8gXHU2NzJDXHU1NzMwXHU1QjU4XHU1NzI4XHU0RjQ2XHU0RTBEXHU1QzVFXHU0RThFXHU3QUQ5XHU3MEI5XHU3Njg0XHU2NTg3XHU0RUY2XHVGRjA4T2JzaWRpYW4gQ29waWxvdFx1MzAwMVx1NjVFN1x1N0IxNFx1OEJCMFx1N0I0OVx1RkYwOVx1RkYwQ1xuICAvLyBcdTRFMERcdTYzOTJcdTk2NjRcdTRGMUFcdThCQTkgZG9jczpkZXYgLyBkb2NzOmJ1aWxkIFx1NzZGNFx1NjNBNVx1NjJBNVx1OTUxOVxuICBzcmNFeGNsdWRlOiBbXG4gICAgJ2NvcGlsb3QvKionLFxuICAgICcwNjIxYmdwaWMubWQnLFxuICAgICdsYWItbm90ZXMvZG9jeC1tZCZwaWMmc2lkZWJhci5tZCdcbiAgXSxcblxuICB0aGVtZUNvbmZpZzoge1xuICAgIHNpdGVUaXRsZTogJ01vdW50YWlucyBhbmQgUml2ZXJzJyxcblxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICdsb2NhbCdcbiAgICB9LFxuXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdIb21lJywgbGluazogJy8nIH0sXG4gICAgICB7IHRleHQ6ICdDUyBOb3RlcycsIGxpbms6ICcvY3Nub3RlcycgfSxcbiAgICAgIHsgdGV4dDogJ090aGVycycsIGxpbms6ICcvb3RoZXJzJyB9XG4gICAgXSxcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1N0dWR5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ1MgU3R1ZHknLFxuICAgICAgICAgICAgbGluazogJy9jc25vdGVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTGFiIE5vdGVzJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnMDQxMyBMYWIgUmVwb3J0JywgbGluazogJy9sYWItbm90ZXMvMDQxM2xhYicgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJzA0MjAgTGFiIFJlcG9ydCcsIGxpbms6ICcvbGFiLW5vdGVzLzA0MjBsYWInIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICcwNTI1IExhYiBSZXBvcnQnLCBsaW5rOiAnL2xhYi1ub3Rlcy8wNTI1bGFiJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnMDYwMSBMYWIgUmVwb3J0JywgbGluazogJy9sYWItbm90ZXMvMDYwMWxhYicgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0xpbnV4JyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0hlbGxvIExpbnV4JywgbGluazogJy9saW51eC9IZWxsb0xpbnV4JyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdMaW51eCBjb21tYW5kcycsIGxpbms6ICcvbGludXgvTGludXhfY29tbWFuZHMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ2dkYiB4IGNvbW1hbmQnLCBsaW5rOiAnL2xpbnV4L2dkYl94X2NvbW1hbmQnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0JvbWIgTGFiIFJlbGF0ZWQnLCBsaW5rOiAnL2xpbnV4L0JvbWJfTGFiX1JlbGF0ZWQnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0JvbWIgTGFiJywgbGluazogJy9saW51eC9Cb21iX0xhYicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQXR0YWNrIExhYicsIGxpbms6ICcvbGludXgvQXR0YWNrX0xhYicgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnSW50ZXJlc3RzJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdHZW9HdWVzc3InLCBsaW5rOiAnL2ludGVyZXN0cy9nZW9ndWVzc3InIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ01pc2MnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ090aGVycycsIGxpbms6ICcvb3RoZXJzJyB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vTHVhbkppYW5nWGluZycgfVxuICAgIF0sXG5cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQStVLFNBQVMsb0JBQW9CO0FBRTVXLElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQTtBQUFBO0FBQUEsRUFJYixZQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBRUEsYUFBYTtBQUFBLElBQ1gsV0FBVztBQUFBLElBRVgsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQzFCLEVBQUUsTUFBTSxZQUFZLE1BQU0sV0FBVztBQUFBLE1BQ3JDLEVBQUUsTUFBTSxVQUFVLE1BQU0sVUFBVTtBQUFBLElBQ3BDO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0scUJBQXFCO0FBQUEsa0JBQ3RELEVBQUUsTUFBTSxtQkFBbUIsTUFBTSxxQkFBcUI7QUFBQSxrQkFDdEQsRUFBRSxNQUFNLG1CQUFtQixNQUFNLHFCQUFxQjtBQUFBLGtCQUN0RCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0scUJBQXFCO0FBQUEsZ0JBQ3hEO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDSSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMLEVBQUUsTUFBTSxlQUFlLE1BQU0sb0JBQW9CO0FBQUEsa0JBQ2pELEVBQUUsTUFBTSxrQkFBa0IsTUFBTSx3QkFBd0I7QUFBQSxrQkFDeEQsRUFBRSxNQUFNLGlCQUFpQixNQUFNLHVCQUF1QjtBQUFBLGtCQUN0RCxFQUFFLE1BQU0sb0JBQW9CLE1BQU0sMEJBQTBCO0FBQUEsa0JBQzVELEVBQUUsTUFBTSxZQUFZLE1BQU0sa0JBQWtCO0FBQUEsa0JBQzVDLEVBQUUsTUFBTSxjQUFjLE1BQU0sb0JBQW9CO0FBQUEsZ0JBQ2xEO0FBQUEsY0FDSjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sYUFBYSxNQUFNLHVCQUF1QjtBQUFBLFFBQ3BEO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxVQUFVLE1BQU0sVUFBVTtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLGFBQWE7QUFBQSxNQUNYLEVBQUUsTUFBTSxVQUFVLE1BQU0sbUNBQW1DO0FBQUEsSUFDN0Q7QUFBQSxFQUVGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
