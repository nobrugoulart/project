export default {
  apps: [{
    name: 'vip-tools-bot',
    script: 'src/index.js',
    watch: true,
    autorestart: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    max_restarts: 10,
    restart_delay: 4000
  }]
}