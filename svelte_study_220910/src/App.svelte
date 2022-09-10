<script>//스크립트 영역
	export let name;
	import Header from './ch03_components/header.svelte'
	import Footer from './ch03_components/footer.svelte'; 
	import Content from './ch03_components/content.svelte';

	//상태(state)값
	let count = 0;

	const handleClick = ()=>{
		count++;
	};

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
<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<button on:click={handleClick}>
		클릭 수 {count}
	</button>
</main>

{#each statusList as item}
		<li>
			  {item.id}<br/>
			  {item.content}<br/>
			  {item.done}<br/>
		</li>
{/each}

<input type="text" bind:value={newOne} placeholder="할일 내용을 입력해주신 후 우측의 버튼을 눌러주세요" style="width : 800px;"/>
<button on:click={handleAddToDo}>할일 추가하기</button>

<!--style 영역-->
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
<Header/>
<Content/>
<Footer/>