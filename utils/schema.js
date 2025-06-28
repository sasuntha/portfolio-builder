const { relations } = require("drizzle-orm");
const { pgTable, serial, varchar, text, integer, boolean } = require("drizzle-orm/pg-core");

const userinfo = pgTable("userinfo", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  bio:text("bio",{length:255}),
  location:varchar('location'),
  link:varchar('link'),
  profileimage:varchar('profileimage'),
  theme:varchar('theme').default('light')
});

const project = pgTable('projects',{
  id:serial('id').primaryKey(),
  name:varchar('name'),
  des:text('description'),
  url:varchar('url'),
  logo:varchar('logo'),
  banner:varchar('banner'),
  category:varchar('categroy'),
  active:boolean('active').default(true),
  emailref:varchar('email'),
  userref:integer('userref').references(()=>userinfo?.id),
})

const userprojectrelation = relations(userinfo,({many})=>(
  {
    project:many(project)
  }
))

const postrelation = relations(project,({one})=>(
  {
    user:one(userinfo,{fields:[project.userref],references:[userinfo.id]})
  }
))

module.exports = { userinfo , project , userprojectrelation , postrelation};
