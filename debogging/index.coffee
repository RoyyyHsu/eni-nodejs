foo = (txt = 'foo') ->
  console.log txt

bar = (txt = 'bar') ->
  console.log txt
  foo()

bar()
