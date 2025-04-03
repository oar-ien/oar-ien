source "https://rubygems.org"

# Comment out the Jekyll gem when using github-pages
# gem "jekyll", "~> 4.4.1"

# This is the default theme for new Jekyll sites
gem 'minima', '~> 2.5'

# Uncomment and use only the github-pages gem
gem "github-pages", group: :jekyll_plugins
# gem "jekyll", "~> 4.4.1"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem 'jekyll-paginate'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
