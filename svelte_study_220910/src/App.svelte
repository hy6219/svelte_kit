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

</script>

<!--markup 영역-->
<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<button on:click={handleClick}>
		클릭 수 {count}
	</button>
</main>
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