
set :application, "Speak"

set :user, 'root'
set :domain, '88.190.216.170'
set :applicationdir, "/var/www/#{application}"

set :scm, :git
set :repository,  "git@github.com:Alexandre-Strzelewicz/Speak.git"
set :branch, :master
set :scm_verbose, true

role :web, domain
role :app, domain
role :db, domain, :primary => true

set :deploy_to, applicationdir

set :deploy_via, :checkout

default_run_options[:pty] = true

set :node_path, '/root/nvm/v0.6.19/bin/node'
set :forever_path, '/root/nvm/v0.6.19/bin/forever'

set :pid_file, "#{applicationdir}/shared/pid/web.pid"
set :log_file, "#{applicationdir}/shared/log/web.log"

after "deploy", "deploy:stop", "deploy:prepare", "deploy:start"

# --pidFile #{pid_file} -a #{log_file}

namespace :deploy do

  task :prepare do
    run "cd #{current_path}; npm install"
  end

  task :start do
    run "cd #{current_path}  && #{forever_path} start  #{current_path}/launch.js --server "
  end

  task :stop do
    run "cd #{current_path} ;  #{forever_path} stop #{current_path}/launch.js"     
  end

end
