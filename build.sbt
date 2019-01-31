name := "querycollection"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,
  "org.json"%"json"%"20160810",
  "commons-io"%"commons-io"%"2.6"
)     

play.Project.playJavaSettings
