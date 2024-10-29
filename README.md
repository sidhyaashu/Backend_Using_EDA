# Backend_Using_EDA
Highly Scaalable Backend Using Kafka Using Event-Driven Architecture


## Requirements installed software
1. Docker
2. zookeeper
3. kafka
4. node.js
6. Hono
7. Bun
8. k6

## Steps: 
1. Clone the git repo : https://github.com/sidhyaashu/Backend_Using_EDA
2. Install required node_moduels :
```bash
bun add
```
3. Start docker and before run set the IP in the docker-compose file
4. run compose file
```bash
docker-compose up
```
5. start producer:
```bash
bun run post-producer 
```
6. start consumer:
```bash
bun run post-consumer 
```


# Result After Test
```plaintext

checks.........................: 100.00% 29596 out of 29596
     data_received..................: 4.4 MB  7.3 kB/s
     data_sent......................: 5.9 MB  9.8 kB/s
     http_req_blocked...............: avg=22.46µs  min=0s     med=0s     max=11.22ms  p(90)=0s       p(95)=0s
     http_req_connecting............: avg=1.88µs   min=0s     med=0s     max=4.15ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=10.8ms   min=2.14ms med=6.47ms max=494.18ms p(90)=17.85ms  p(95)=29.03ms
       { expected_response:true }...: avg=10.8ms   min=2.14ms med=6.47ms max=494.18ms p(90)=17.85ms  p(95)=29.03ms
     http_req_failed................: 0.00%   0 out of 29596
     http_req_receiving.............: avg=205.35µs min=0s     med=0s     max=40.9ms   p(90)=584.25µs p(95)=705µs
     http_req_sending...............: avg=53.45µs  min=0s     med=0s     max=27.11ms  p(90)=0s       p(95)=520.2µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s     max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=10.54ms  min=1.86ms med=6.2ms  max=493.59ms p(90)=17.51ms  p(95)=28.5ms
     http_reqs......................: 29596   49.245191/s
     iteration_duration.............: avg=1.01s    min=1s     med=1s     max=1.5s     p(90)=1.02s    p(95)=1.04s
     iterations.....................: 29596   49.245191/s
     vus............................: 1       min=1              max=50
     vus_max........................: 50      min=50             max=50

```