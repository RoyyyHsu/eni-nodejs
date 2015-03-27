package_for_n:
  pkg:
    - installed
    - pkgs:
      - curl

download_n:
  cmd.run:
    - name: 'curl -o /usr/local/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n'
    - unless: which n

executable_n:
  cmd.run:
    - name: 'chmod +x /usr/local/bin/n'

install_n:
  cmd.run:
    - name: '/usr/local/bin/n stable'
