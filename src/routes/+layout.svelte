<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { pageTransition } from '$lib/actions/motion';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div use:pageTransition class="w-full min-h-screen">
	{@render children()}
</div>
