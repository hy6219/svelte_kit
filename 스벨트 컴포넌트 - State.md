# 스벨트 컴포넌트 - State

- 컴포넌트의 상태
- 특정 이벤트가 동작함에 따라 변경되는 값
- `{}` 기호로 마크업에 상태값 표현

```html
<script>//스크립트 영역
	//상태(state)값
	let count = 0;

	const handleClick = ()=>{
		count++;
	};

</script>

<!--markup 영역-->
<main>

	<button on:click={handleClick}>
		클릭 수 {count}
	</button>
</main>

```

객체 상태 (객체 리스트 상태 ) 변경

```html
<script>//스크립트 영역

	let statusList = [
		{
			id:0,
			content:'첫 번째 할 일',
			done: false
		},
		{
			id:1,
			content:'두 번째 할 일',
			done: false
		},
		{
			id:2,
			content:'세 번째 할 일',
			done: false
		},
		{
			id:3,
			content:'네 번째 할 일',
			done: false
		}
	];

	let newOne;

	const handleAddToDo = ()=>{
		console.log(`content: ${newOne}`);

		const todo = {
			id: statusList.length + 1,
			content : newOne,
			done:false
		};
		
		/*
		statusList.push(todo);

		//재할당
		statusList = statusList;
		*/

		//또다른 방법(스프레드 이용)
		statusList = [...statusList, todo];

		//인풋필드 값 비워주기
		newOne = '';

	};

</script>

<!--markup 영역-->

{#each statusList as item}
		<li>
			  {item.id}<br/>
			  {item.content}<br/>
			  {item.done}<br/>
		</li>
{/each}

<input type="text" bind:value={newOne} placeholder="할일 내용을 입력해주신 후 우측의 버튼을 눌러주세요" style="width : 800px;"/>
<button on:click={handleAddToDo}>할일 추가하기</button>

```
