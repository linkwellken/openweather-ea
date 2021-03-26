# Chainlink External Adapter for openweather

### Input Params

| Required? |            Name            |               Description                |       Options       | Defaults to |
| :-------: | :------------------------: | :--------------------------------------: | :-----------------: | :---------: |
|    ✅     | `q`, `city`, or `town`  |          |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "city": "Boston"
    
  }
}
```

### Sample Output

```json
{
  "jobId": "f5bdedaead8846f891fd05ac83f9df2a",
  "result": {
    "data": {
      "city": "boston",
      "result": 286.36
    },
    
```
